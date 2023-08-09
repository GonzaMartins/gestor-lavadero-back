const mongoose = require("mongoose");

// const AcolchadosScheme = new mongoose.Schema ({
//     plaza: {
//         type: Number,
//     },
//     dosPlazas: {
//         type: Number
//     },
//     dosPlazasYMedia: {
//         type: Number
//     },
//     plumas: {
//         type: Number
//     }
// })


const PreciosScheme = new mongoose.Schema(
  {
    valet: {
      type: Number,
    },
    // acolchado: {
    //   type: AcolchadosScheme,
    // },
    lavado: {
      type: Number,
    },
    secado: {
      type: Number,
    },
    planchado: {
      type: Number,
    },
    plaza: {
      type: Number,
  },
  dosPlazas: {
      type: Number
  },
  dosPlazasYMedia: {
      type: Number
  },
  plumas: {
      type: Number
  }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Precios", PreciosScheme);
