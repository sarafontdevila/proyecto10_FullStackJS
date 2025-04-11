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
    return res.status(400).json("error")
    
  }
}
const updateEvento = async (req, res) => {
  try {
    const {id} = req.params
    const newEvento = new Evento(req.body)
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

module.exports = { getEventos, getEventoById, postEvento, updateEvento, deleteEvento }