require ("dotenv").config()
const express = require ('express');

const app = express()

app.use("/ping", (req, res, next) => {
  res.status(200).json("Pong!");
})

app.listen(3000, () => {
  console.log('Escuchando en http://localhost:3000')
})