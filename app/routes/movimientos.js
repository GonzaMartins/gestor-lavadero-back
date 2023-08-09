const express = require('express')

const router = express.Router()

const controller = require("../controllers/movimientos")

const path = "Movimientos"

router.get(
    `/${path}`,
    controller.getMovimientos
)

router.get(
    `/${path}/hoy`,
    controller.getMovimientosHoy
)

router.get(
    `/${path}/gastos`,
    controller.getGastos
)

router.get(
    `/${path}/ingresos`,
    controller.getIngresos
)

router.get(
    `/${path}/gastos/rango`,
    controller.getGastosPorRango
)

router.get(
    `/${path}/ingresos/rango`,
    controller.getIngresosPorRango
)

router.get(
    `/${path}/rango`,
    controller.getMovimientosPorRango
)

router.post(
    `/${path}`,
    controller.postMovimiento
)

router.put(
    `/${path}/:id`,
    controller.updateMovimiento
)

module.exports = router