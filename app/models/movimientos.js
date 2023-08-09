const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MovimientosScheme = new mongoose.Schema(
  {
    tipo: {
      type: String,
      enum: ["gasto", "ingreso"],
      required: true,
    },
    monto: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

MovimientosScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("Movimientos", MovimientosScheme);
