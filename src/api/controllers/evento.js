const Evento = require("../models/evento")

const getEventos = async (req, res) => {
  try {
    const eventos = await Evento.find()
    return res.status(200).json(eventos)
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const getEventoById = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const postEvento = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const updateEvento = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const deleteEvento = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}

module.exports = { getEventos, getEventoById, postEvento, updateEvento, deleteEvento }