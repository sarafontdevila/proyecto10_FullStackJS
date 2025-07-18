const { isAuth, isAdmin } = require("../../middlewares/auth")
const upload = require("../../middlewares/file")

const { getEventos, getEventoById, crearEvento, updateEvento, deleteEvento, quitarAsistente, addAsistente,getAsistentesEvento, getEventosCreados} = require("../controllers/evento")
const eventosRouter = require("express").Router()

eventosRouter.get("/eventos-creados", isAuth, getEventosCreados)
eventosRouter.get("/", getEventos)
eventosRouter.get("/:id", getEventoById)
eventosRouter.post("/", isAuth, upload.single('imagen'), crearEvento)
eventosRouter.put("/:id", isAuth,upload.single("imagen"), updateEvento)
eventosRouter.delete("/:id", isAuth, deleteEvento)
eventosRouter.put("/:id/asistentes", isAuth, addAsistente)
eventosRouter.delete("/:id/asistentes/:userId", isAuth, quitarAsistente)
eventosRouter.get("/:id/asistentes", isAuth, getAsistentesEvento)


module.exports = eventosRouter