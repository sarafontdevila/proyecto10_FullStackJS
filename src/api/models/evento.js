const mongoose = require("mongoose")

const eventoSchema = new mongoose.Schema({
  nombre: {type: String, required: true},
  precio: {type: Number, required: true},
  fecha: {type: Date, required: true},
  lugar: {type: String, required: true},
  imagen: {type: String, required: true},

},{
  timestamps: true,
  collection: "eventos"
})

const Evento = mongoose.model("eventos", eventoSchema, "eventos")
module.exports = Evento
