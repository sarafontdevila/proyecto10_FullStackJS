const Evento = require("../models/evento")
const User = require("../models/user")

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
    console.log("🧾 req.body:", req.body);
    console.log("🖼️ req.file:", req.file);
    const newEvento = new Evento(req.body)
    if (req.file){
      newEvento.imagen = req.file.path
    }
    const evento = await newEvento.save()
    return res.status(200).json(evento)
    
  } catch (error) {
    console.log("error", error)
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
const addAsistente = async (req, res) => {
  try {
    const { id } = req.params;
    const { asistente } = req.body;
    
    const evento = await Evento.findById(id);
    
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    
    if (!evento.asistentes.includes(asistente)) {
      evento.asistentes.push(asistente);
      await evento.save();
    }
    
    res.status(200).json({ message: "Asistente añadido correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const quitarAsistente =async (req, res) => {
  try {
    const { id, userId } = req.params;
    
    const evento = await Evento.findById(id);
    
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }
    
    evento.asistentes = evento.asistentes.filter(
      asistente => asistente.toString() !== userId
    );
    
    await evento.save();
    
    res.status(200).json({ message: "Asistente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getAsistentesEvento = async (req, res) => {
  try {
    const idEvento = req.params.id;
    
    const evento = await Evento.findById(idEvento);
    
    if (!evento) {
      return res.status(404).json({ mensaje: "Evento no encontrado" });
    }
    
    const asistentes = await User.find(
      { _id: { $in: evento.asistentes } },
      { nombre: 1} 
    );
    
    res.status(200).json(asistentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener asistentes del evento" });
  }
};




module.exports = { getEventos, getEventoById, postEvento, updateEvento, deleteEvento, addAsistente,quitarAsistente, getAsistentesEvento }