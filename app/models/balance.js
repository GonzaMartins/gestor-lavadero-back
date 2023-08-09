const mongoose = require("mongoose");

const BalanceScheme = new mongoose.Schema(
  {
    total: {
      type: Number,
    },
    ingresos: {
      type: Number,
    },
    gastos: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Balance", BalanceScheme);
