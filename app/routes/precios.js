const express = require('express')

const router = express.Router()

const controller = require("../controllers/precios")

const path = "precios"

router.get(
    `/${path}`,
    controller.getPrecios
)

router.post(
    `/${path}`,
    controller.postPrecios
)

router.put(
    `/${path}`,
    controller.updatePrecios
)

module.exports = router