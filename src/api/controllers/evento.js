const Evento = require("../models/evento")

const getEventos = async (req, res, next) => {
  try {
    const eventos = await Evento.find()
    return res.status(200).json(eventos)
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const getEventoById = async (req, res, next) => {
  try {
    const {id} = req.params
    const evento = await Evento.findById(id)
    return res.status(200).json(evento)
  } catch (error) {
    return res.status(400).json("error")
  }
}
const postEvento = async (req, res) => {
  try {
    const newEvento = new Evento(req.body)
    const evento = await newEvento.save()
    return res.status(200).json(evento)
    
  } catch (error) {
    return res.status(400).json("error", error)
    
  }
}
const updateEvento = async (req, res) => {
  try {
    const {id} = req.params
    req.body.imagen = req.file?.path || "imagen rota";
    
    const newEvento = new Evento(req.body)
    newEvento._id = id
    const eventoUpdated = await Evento.findByIdAndUpdate(id, newEvento, {new:true})
    return res.status(200).json(eventoUpdated)
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params
    const evento = await Evento.findByIdAndDelete(id)
    return res.status(200).json(evento)
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const quitarAsistente =async (req, res) => {
  const { id } = req.params
  const { userId } = req.body

  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(
      id,
      { $pull: { asistentes: userId } },
      { new: true }
    )
    res.status(200).json(eventoActualizado)
  } catch (err) {
    res.status(500).json({ message: "Error al quitar asistente", error: err })
  }
}



module.exports = { getEventos, getEventoById, postEvento, updateEvento, deleteEvento, quitarAsistente }