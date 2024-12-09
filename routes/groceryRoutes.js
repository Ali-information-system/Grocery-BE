const express = require("express");
const router = express.Router();
const Grocery = require("../models/Grocery");

router.get("/", async (req, res) => {
  try {
    const groceries = await Grocery.findAll();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    category,
    quantity,
    unit,
    priority,
    price,
    brand,
    purchase_status,
  } = req.body;
  try {
    const newGrocery = await Grocery.create({
      name,
      category,
      quantity,
      unit,
      priority,
      price,
      brand,
      purchase_status,
    });
    res.status(201).json(newGrocery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    category,
    quantity,
    unit,
    priority,
    price,
    brand,
    purchase_status,
  } = req.body;
  try {
    const grocery = await Grocery.findByPk(id);
    if (!grocery) {
      return res.status(404).json({ message: "Grocery item not found." });
    }

    grocery.name = name || grocery.name;
    grocery.category = category || grocery.category;
    grocery.quantity = quantity || grocery.quantity;
    grocery.unit = unit || grocery.unit;
    grocery.priority = priority || grocery.priority;
    grocery.price = price || grocery.price;
    grocery.brand = brand || grocery.brand;
    grocery.purchase_status = purchase_status || grocery.purchase_status;

    await grocery.save();
    res.json(grocery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const grocery = await Grocery.findByPk(id);
    if (!grocery) {
      return res.status(404).json({ message: "Grocery item not found." });
    }
    await grocery.destroy();
    res.json({ message: "Grocery item deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
