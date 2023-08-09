const express = require('express')

const router = express.Router()

const controller = require("../controllers/balance")

const path = "balance"

router.get(
    `/${path}`,
    controller.getBalance
)

router.post(
    `/${path}`,
    controller.postBalance
)


module.exports = router