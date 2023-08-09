const model = require("../models/precios");
const utils = require("../utils");

exports.getPrecios = async (req, res) => {
  try {
    await model.find({}).then((data) => {
      res.send({ data });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener pedidos");
  }
};

exports.postPrecios = async (req, res) => {
  const data = req.body;

  await model.create(data).then((data, err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al hacer el post de los precios");
    } else {
      res.send({ data });
    }
  });
};

exports.updatePrecios = async (req, res) => {
  const { body } = req;
  const id = utils.parseID("645d4318c229aa72b20d92b8");
  
  await model.updateOne({ _id: id }, body).then((data, err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al hacer el update de los precios");
    } else {
      console.log({data});
      res.send({ data });
    }
  });
};
