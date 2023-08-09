const express = require("express");
const iniDB = require("./config/db");
const app = express(0);

const port= "3001"

app.listen(port, () => {
    console.log(`listen on port ${port}`)
});
