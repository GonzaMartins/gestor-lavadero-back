const model = require("../models/movimientos");
const modelPedidos = require("../models/pedidos");
const utils = require("../utils");
const modelBalance = require("../models/balance");

exports.getMovimientos = async (req, res) => {
  try {
    await model.find({}).then((data) => {
      res.send({ data });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener movimientos");
  }
};

exports.getMovimientosHoy = async (req, res) => {
  const hoy = new Date();
  const manana = new Date();
  manana.setDate(manana.getDate() + 1);
  manana.setHours(0, 0, 0, 0);
  hoy.setHours(0, 0, 0, 0);
  try {
    await model
      .find({
        createdAt: {
          $gte: hoy,
          $lt: manana,
        },
      })
      .then((data) => {
        console.log({ data });
        res.send({ data });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener movimientos");
  }
};

exports.getMovimientosPorRango = async (req, res) => {
  let { desde, hasta } = req.query;

  desde = new Date(Date.parse(desde));
  hasta = new Date(Date.parse(hasta));

  try {
    await model
      .find({
        createdAt: { $gte: desde, $lte: hasta },
      })
      .then((data) => {
        res.send({ data });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener movimientos");
  }
};

exports.postMovimiento = async (req, res) => {
  const data = req.body;

  await model.create(data).then( async (data, err) => {
    if (err) {
      console.log(err);
    } else {
      if(data.tipo === 'ingreso'){
      let balanceActualizado = await modelBalance.findOneAndUpdate(
        {},
        { $inc: { total: data.monto } },
        { new: true }
      );
      res.send({data});
    } else {
      let balanceActualizado = await modelBalance.findOneAndUpdate(
        {},
        { $inc: { total: -data.monto } },
        { new: true }
      );
      res.send({data});
    }
    }
  });
};

exports.updateMovimiento = async (req, res) => {
  const id = utils.parseID(req.params.id);
  const movimiento = req.body;
  await model.updateOne({ _id: id }, movimiento).then((data, err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ data });
    }
  });
};

exports.getGastos = async (req, res) => {
  try {
    const gastos = await model.find({ tipo: "gasto" });

    res.json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
};

exports.getIngresos = async (req, res) => {
  try {
    const ingresos = await model.find({ tipo: "ingreso" });

    res.json(ingresos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
};

exports.getGastosPorRango = async (req, res) => {
  let { desde, hasta } = req.query;
  let getGastosT = (gastos) => {
    let total = 0;
    gastos.forEach((element) => {
      total += element.monto;
    });

    return total;
  }
  desde = new Date(Date.parse(desde));
  hasta = new Date(Date.parse(hasta));
  try {
    const gastos = await model.find({
      tipo: "gasto",
      createdAt: { $gte: desde, $lte: hasta },
    });

    let respuesta = {gastos, total: getGastosT(gastos)}
    res.json(respuesta);
    // console.log({gastos});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
};

exports.getIngresosPorRango = async (req, res) => {
  let { desde, hasta } = req.query;
  let getTotal = (ingresosMovimientos, pedidosEntregados) => {
    let total = 0;
    ingresosMovimientos.forEach((element) => {
      total += element.monto;
    });
    pedidosEntregados.forEach((element) => {
      total += element.precioTotal;
    });

    return total;
  };
  desde = new Date(Date.parse(desde));
  hasta = new Date(Date.parse(hasta));

  try {
    const ingresosMovimientos = await model.find({
      tipo: "ingreso",
      createdAt: { $gte: desde, $lte: hasta },
    });
    const pedidosEntregados = await modelPedidos.find({
      "fueEntregado.entregado": true,
      createdAt: { $gte: desde, $lte: hasta },
    });
    console.log(pedidosEntregados);
    let respuesta = {
      movimientos: ingresosMovimientos,
      pedidos: pedidosEntregados,
      total: getTotal(ingresosMovimientos, pedidosEntregados),
    };
    res.json(respuesta);
    console.log({ res });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ha ocurrido un error en el servidor." });
  }
};