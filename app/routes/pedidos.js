const express = require('express')
const DB_URI = `mongodb://127.0.0.1:27017/Lavadero`;

const router = express.Router()

const controller = require("../controllers/pedidos")

const path = "pedidos"

console.log(router.get(
    `/${path}`,
    controller.getPedidos
));
router.get(
    `/${path}`,
    controller.getPedidos
)

router.get(
    `/${path}/sinEntregar`,
    controller.getPedidosSinEntregar
)

router.get(
    `/${path}/entregados`,
    controller.getPedidosEntregados
)

router.get(
    `/${path}/debe`,
    controller.getPedidosDebe
)

router.get(
    `/${path}/porFecha`,
    controller.getPedidosPorFecha,
)

router.get(
    `/${path}/hoy`,
    controller.getPedidosHoy
)

router.get(
    `/${path}/rango`,
    controller.getPedidosPorRango
)

router.post(
    `/${path}`,
    controller.postPedidos
)
router.put(
    `/${path}/:id`,
    controller.updatePedido
)

router.put(
    `/${path}/entregarPedido/:id`,
    controller.pedidoEntregado
)


module.exports = router