const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const DetallesPedidosScheme = new mongoose.Schema({
  servicio: {
    type: String,
  },
  cantidad: {
    type: Number,
  },
  precio: {
    type: Number,
  },
  detallePedidoId: {
    type: Number,
  },
});

const PedidosScheme = new mongoose.Schema(
  {
    fechaPedido: {
      type: Date,
      required: true,
    },
    fechaEntrega: {
      type: Date,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    PedidoId: {
      type: Number,
    },
    precioTotal: {
      type: Number,
      required: true,
    },
    detallesPedido: {
      type: [DetallesPedidosScheme],
    },
    debe: {
      debe: {
        type: Boolean,
        required: true,
        default: false
      },
      monto: {
        type: Number,
      },
    },
    fueEntregado: {
      entregado: {
        type: String,
        enum: ["Entregado", "No entregado", "Debe"],
        default: "No entregado",
      },
      fecha: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PedidosScheme.plugin(mongoosePaginate);
module.exports = mongoose.model("Pedidos", PedidosScheme);
