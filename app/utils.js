const mongoose = require("mongoose");

exports.parseID = (id) => {
  return new mongoose.Types.ObjectId(id);
};

exports.calcularPrecioTotal = (detalles) => {
  precioTotal = 0;
  detalles.forEach((element) => {
    precioTotal += element.precio;
  });
  return precioTotal;
};
