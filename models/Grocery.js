const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Grocery = sequelize.define(
  "Grocery",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.DECIMAL(10, 2),
    },
    unit: {
      type: DataTypes.STRING,
    },
    priority: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    brand: {
      type: DataTypes.STRING,
    },
    purchase_status: {
      type: DataTypes.STRING,
      defaultValue: "To Buy",
    },
  },
  {
    timestamps: true,
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("Grocery table has been created!");
  })
  .catch((err) => {
    console.error("Error syncing the model:", err);
  });

module.exports = Grocery;
