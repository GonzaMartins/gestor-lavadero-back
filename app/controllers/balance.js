const model = require("../models/balance")
const mongoose = require("mongoose");
const utils = require("../utils")

exports.getBalance = async (req, res) => {
    try {
      await model.find({}).then((data) =>{
      console.log({data});
      res.send({data});
    })
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener pedidos');
    }
  };

  exports.incrementBalance = async (req, res) => {
    // try {
    //   await model.find({}).then((data) =>{
    //   console.log({data});
    //   res.send({data});
    // })
    // } catch (err) {
    //   console.error(err);
    //   res.status(500).send('Error al obtener pedidos');
    // }
    let balance;
    await model.find({ _id: utils.parseID("64650d20bf221b8357a30b9a") }).then((data, err) => {
      if (err) {
        console.log(err);
      } else {
        // res.send({ data });
        balance = data
        console.log(data);
      }
    });
    console.log({balance});
    balance.total = req.body.num
    await model.updateOne({ _id: utils.parseID("64650d20bf221b8357a30b9a") }, balance).then((data, err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);

        res.send({ data });
      }
    });
  };

  exports.postBalance = async (req, res) => {
    const data = req.body;

    await model.create(data).then((data, err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ data });
      }
    }); 
  };