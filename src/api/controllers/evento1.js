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
/*const postEvento = async (req, res) => {
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
}*/

const crearEvento = async (req, res) => {
  try {
    const userId = req.user.id

    const nuevoEvento = new Evento({
      ...req.body,
      creadorId: userId,
      imagen: req.file ? req.file.path : undefined
    })

    const eventoGuardado = await nuevoEvento.save()
    return res.status(201).json(eventoGuardado)
  } catch (error) {
    console.log("Error al crear evento:", error)
    return res.status(500).json({ error: "Error al crear evento" })
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
    return res.status(400).json("error al actualizar evento")
    
  }
}

const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const evento = await Evento.findById(id)

    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" })
    }

    if (evento.creadorId.toString() !== userId) {
      return res.status(403).json({ error: "No autorizado para eliminar este evento" })
    }

    await Evento.findByIdAndDelete(id)
    return res.status(200).json({ mensaje: "Evento eliminado correctamente" })
  } catch (error) {
    return res.status(400).json("Error al eliminar evento")
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
const getMisEventos = async (req, res) => {
  try {
    const userId = req.user.id;
    const eventos = await Evento.find({
      asistentes: { $in: [userId] }
    });
    return res.status(200).json(eventos);
  } catch (error) {
    console.error("Error al obtener mis eventos:", error);
    return res.status(500).json({ error: "Error al obtener mis eventos" });
  }
};




module.exports = { getEventos, getEventoById, crearEvento, updateEvento, deleteEvento, crearEvento, addAsistente,quitarAsistente, getAsistentesEvento, getMisEventos }