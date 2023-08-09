const model = require("../models/pedidos");
const modelBalance = require("../models/balance");
const DB_URI = `mongodb://127.0.0.1:27017/Lavadero`;
const db = require("../../config/db");
const mongoose = require("mongoose");
// const controllerDetalle = require("../controllers/detallesPedido")
const utils = require("../utils");
const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };

exports.getPedidos = async (req, res) => {
  let options = {
    // page: 1,
    limit: 50,
  };
  try {
    await model.paginate({}, options).then((data) => {
      res.send(data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener pedidos");
  }
};

exports.getPedidosSinEntregar = async (req, res) => {
  let options = {
    // page: 1,
    limit: 50,
  };
  try {
    await model
      .paginate({ "fueEntregado.entregado": "No entregado" }, options)
      .then((data) => {
        console.log({ data });
        res.send(data);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener pedidos");
  }
};

exports.getPedidosEntregados = async (req, res) => {
  let options = {
    // page: 1,
    limit: 50,
  };
  try {
    await model
      .paginate({ "fueEntregado.entregado": "Entregado" }, options)
      .then((data) => {
        console.log({ data });
        res.send(data);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener pedidos");
  }
};

exports.getPedidosDebe = async (req, res) => {
  try {
    await model.find({ "debe.debe": true }).then((data) => {
      console.log({ data });
      res.send(data);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener pedidos");
  }
};

exports.getPedidosPorFecha = async (req, res) => {
  let options = {
    // page: 1,
    limit: 50,
  };

  let currentDate = new Date(req.query.fecha);
  const startOfDay = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0
    )
  );
  const endOfDay = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    )
  );

  try {
    await model
      .paginate(
        {
          fechaEntrega: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        },
        options
      )
      .then((data) => {
        console.log({ data });
        res.send(data);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener pedidos");
  }
};

exports.getPedidosHoy = async (req, res) => {
  const currentDate = new Date();
  const startOfDay = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0
    )
  );
  const endOfDay = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59
    )
  );

  try {
    const pedidos = await model.find({
      fechaEntrega: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    res.send(pedidos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener pedidos");
  }
};
exports.getPedidosPorRango = async (req, res) => {
  let options = {
    page: 1,
    limit: 50,
  };

  let { desde, hasta } = req.body;
  console.log(desde, hasta);

  desde = new Date(Date.parse(desde));
  hasta = new Date(Date.parse(hasta));

  console.log(desde, hasta);

  try {
    await model
      .find({
        fechaPedido: { $gte: desde, $lte: hasta },
        fueEntregado,
      })
      .then((data) => {
        res.send({ data });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener movimientos");
  }
};

exports.postPedidos = async (req, res) => {
  const opciones = { day: "2-digit", month: "2-digit", year: "numeric" };

  const data = req.body;
  data.fechaEntrega = new Date(Date.parse(data.fechaEntrega));
  // new Date(data.fechaEntrega).toLocaleDateString("es-ES", {
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  // });
  data.fechaPedido = new Date(Date.parse(data.fechaPedido));
  // new Date(data.fechaPedido).toLocaleDateString(
  //   "es-ES",
  //   opciones
  // );
  data.precioTotal = utils.calcularPrecioTotal(data.detallesPedido);
  console.log(data.fechaEntrega);
  await model.create(data).then((data, err) => {
    if (err) {
      console.log(err);
    } else {
      console.log({ data });
      res.send({ data });
    }
  });
};

exports.updatePedido = async (req, res) => {
  const id = utils.parseID(req.params.id);
  const pedido = req.body;
  if (pedido.precioTotal || pedido.detallesPedido) {
    pedido.precioTotal = utils.calcularPrecioTotal(pedido.detallesPedido);
  }
  await model.updateOne({ _id: id }, pedido).then((data, err) => {
    if (err) {
      res.status(500).send("Error al actualizar pedido");
    } else {
      res.send({ data });
    }
  });
};

exports.pedidoEntregado = async (req, res) => {
  const id = utils.parseID(req.params.id);

  try {
    let pedido = await model.findOne({ _id: id });

    console.log("params y body: ", req.params, req.body);

    if (!pedido) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    pedido.fueEntregado.fecha = new Date();

    if (!req.body.debe.debe && req.body.debe.monto) {
      console.log("ENTRO!!!");
      let monto = req.body.debe.monto
      pedido.fueEntregado.entregado = "Entregado";
      pedido.debe.debe = false;
      pedido.debe.monto = null;

      let pedidoActualizado = await pedido.save();
      let balanceActualizado = await modelBalance.findOneAndUpdate(
        {},
        { $inc: { total: monto } },
        { new: true }
      );

      res.json({ pedidoActualizado, balanceActualizado });
    } else {
      if (!req.body.debe.debe) {
        pedido.fueEntregado.entregado = "Entregado";
      } else {
        pedido.fueEntregado.entregado = "Debe";
        pedido.debe.debe = true;
        pedido.debe.monto = req.body.debe.monto;
      }

      let pedidoActualizado = await pedido.save();
      let monto = pedidoActualizado.debe.debe ? pedidoActualizado.precioTotal - pedidoActualizado.debe.monto : pedidoActualizado.precioTotal
      let balanceActualizado = await modelBalance.findOneAndUpdate(
        {},
        { $inc: { total: monto } },
        { new: true }
      );

      res.json({ pedidoActualizado, balanceActualizado });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error en el servidor" });
  }
};
