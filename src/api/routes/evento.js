const { isAuth } = require("../../middlewares/auth")
const upload = require("../../middlewares/file")

const { getEventos, getEventoById, crearEvento, updateEvento, deleteEvento, quitarAsistente, addAsistente,getAsistentesEvento, getMisEventos } = require("../controllers/evento")
const eventosRouter = require("express").Router()

eventosRouter.get("/", getEventos)
eventosRouter.get("/:id", getEventoById)
eventosRouter.post("/", isAuth, upload.single('imagen'), crearEvento)
eventosRouter.put("/:id", isAuth,upload.single("imagen"), updateEvento)
eventosRouter.delete("/:id", isAuth, deleteEvento)
eventosRouter.put("/:id/asistentes", isAuth, addAsistente)
eventosRouter.delete("/:id/asistentes/:userId", isAuth, quitarAsistente)
eventosRouter.get("/:id/asistentes", isAuth, getAsistentesEvento)
eventosRouter.get("/mis-eventos", isAuth, getMisEventos)


module.exports = eventosRouter