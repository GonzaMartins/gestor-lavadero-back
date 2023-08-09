const express = require("express");
const initDB = require("./config/db");
const bodyParser = require("body-parser");
const app = express(0);
const pedidosRoutes = require("./app/routes/pedidos");
const preciosRoutes = require("./app/routes/precios");
const movimientosRoutes = require("./app/routes/movimientos");
const balanceRoutes = require("./app/routes/balance");
const cors = require('cors');

const port = "3001";

app.use(
  bodyParser.urlencoded({
    limit: "20mb",
    extended: true,
  })
);

app.use(
  bodyParser.json({
    limit: "20mb",
  })
);

app.use(cors({
  origin: 'http://localhost:3000' // Reemplaza con el dominio autorizado
}));

app.use(pedidosRoutes, preciosRoutes, movimientosRoutes, balanceRoutes);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});

initDB();
