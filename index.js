require ("dotenv").config()
const express = require ('express');
const { connectDB } = require("./src/config/db")
const eventosRouter = require("./src/api/routes/evento")
const usersRouter = require("./src/api/routes/user")
const cors = require("cors")
const cloudinary = require("cloudinary").v2

const app = express()
connectDB()

app.use (cors())

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(express.json())

app.use("/api/v1/users", usersRouter)
app.use("/api/v1/eventos", eventosRouter)

/*app.use("/*",(req, res, next) => {
  return res.status(404).json("Route Not Found");
})*/
app.use((req, res) => {
  return res.status(404).json({ error: "Route Not Found" });
});

app.listen(3000, () => {
  console.log('Escuchando en http://localhost:3000')
})