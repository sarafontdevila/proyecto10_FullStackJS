const Evento = require("../models/evento")
const User = require("../models/user")
const deleteFile = require("../../utils/deleteFile")

const getEventos = async (req, res, next) => {
  try {
    const eventos = await Evento.find()
  .populate({ path: 'asistentes', select: 'nombre' }) 
  .populate({ path: 'creadorId', select: 'nombre' });
    return res.status(200).json(eventos)
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const getEventoById = async (req, res, next) => {
  try {
    const {id} = req.params
    const evento = await Evento.findById(id)
  .populate({ path: 'asistentes', select: 'nombre' })
  .populate({ path: 'creadorId', select: 'nombre' });
    return res.status(200).json(evento)
  } catch (error) {
    return res.status(400).json("error")
  }
}

const crearEvento = async (req, res) => {
  try {
    const userId = req.user._id

    const nuevoEvento = new Evento({
      ...req.body,
      creadorId: userId,
      asistentes: [userId],
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
    const { id } = req.params;
    const userId = req.user._id;

    const evento = await Evento.findById(id);
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    const isAdmin = req.user.rol === "admin";
    const isCreador = evento.creadorId.toString() === userId.toString();

    if (!isAdmin && !isCreador) {
      return res.status(403).json({ error: "No autorizado para editar este evento" });
    }

    const updateFields = { ...req.body };
    if (req.file) {
      updateFields.imagen = req.file.path;
    }

    const eventoUpdated = await Evento.findByIdAndUpdate(id, updateFields, { new: true });
    return res.status(200).json(eventoUpdated);

  } catch (error) {
    console.error("Error al actualizar evento:", error);
    return res.status(400).json({ error: "Error al actualizar evento" });
  }
};

const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const evento = await Evento.findById(id);
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    const isAdmin = req.user.rol === "admin";
    const isCreador = evento.creadorId.toString() === userId.toString();

    if (!isAdmin && !isCreador) {
      return res.status(403).json({ error: "No autorizado para eliminar este evento" });
    }

    if (evento.imagen) {
      await deleteFile(evento.imagen);
    }

    await Evento.findByIdAndDelete(id);
    return res.status(200).json({ mensaje: "Evento eliminado correctamente" });

  } catch (error) {
    return res.status(400).json({ error: "Error al eliminar evento" });
  }
};
const addAsistente = async (req, res) => {
  try {
    const { id } = req.params;
    const { asistente } = req.body;

    const eventoActualizado = await Evento.findByIdAndUpdate(
      id,
      { $addToSet: { asistentes: asistente } }, 
      { new: true }
    )
    .populate("asistentes", "nombre")
    .populate("creadorId", "nombre");

    if (!eventoActualizado) return res.status(404).json({ message: "Evento no encontrado" });
    res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const quitarAsistente = async (req, res) => {
  try {
    const { id, userId } = req.params;
    console.log("🔍 Eliminando asistente:", userId, "del evento:", id);
    
    const eventoAntes = await Evento.findById(id);
    console.log("👥 Asistentes antes:", eventoAntes?.asistentes)

    const eventoActualizado = await Evento.findByIdAndUpdate(
      id,
      { $pull: { asistentes: userId } },
      { new: true }
    )
    .populate("asistentes", "nombre")
    .populate("creadorId", "nombre");

    console.log("👥 Asistentes después:", eventoActualizado?.asistentes);

    if (!eventoActualizado) return res.status(404).json({ message: "Evento no encontrado" });
    res.status(200).json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const getEventosCreados = async (req, res) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.rol === "admin";

    const query = isAdmin ?{} : { creadorId: userId };
    if (isAdmin) {
      console.log("🔍 Buscando eventos para admin");
    } else {
      console.log("🔍 Buscando eventos para userId:", userId);
    }
    
    const eventos = await Evento.find(query)
    .populate({
      path: 'asistentes', 
      select: 'nombre' 
    }).populate({
      path: 'creadorId',
      select: 'nombre'
    });
    
    return res.status(200).json(eventos);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    return res.status(500).json({ error: "Error al obtener eventos" });
  }
};



module.exports = { getEventos, getEventoById, crearEvento, updateEvento, deleteEvento, addAsistente,quitarAsistente, getAsistentesEvento, getEventosCreados }