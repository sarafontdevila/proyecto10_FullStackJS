/*require ("dotenv").config()
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

app.use((req, res) => {
  return res.status(404).json({ error: "Route Not Found" });
});

/*app.listen(3000, () => {
  console.log('Escuchando en http://localhost:3000')
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Escuchando en http://localhost:'+ PORT);
});*/
require("dotenv").config()
const express = require('express');
const { connectDB } = require("./src/config/db")
const eventosRouter = require("./src/api/routes/evento")
const usersRouter = require("./src/api/routes/user")
const cors = require("cors")
const cloudinary = require("cloudinary").v2

const app = express()


connectDB()


app.use(cors({
  origin: ["*"

  ]
}))


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(express.json())


app.use("/api/v1/users", usersRouter)
app.use("/api/v1/eventos", eventosRouter)

app.get('/', (req, res) => {
  res.json({ 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'API v1 - Eventos y Usuarios',
    endpoints: ['/api/v1/users', '/api/v1/eventos']
  });
});

app.use((req, res) => {
  return res.status(404).json({ error: "Route Not Found" });
});


if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Escuchando en http://localhost:' + PORT);
  });
}


module.exports = app;
