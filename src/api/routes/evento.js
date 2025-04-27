const { isAuth } = require("../../middlewares/auth")
const upload = require("../../middlewares/file")
/*const multer = require("multer")*/
const { getEventos, getEventoById, postEvento, updateEvento, deleteEvento, quitarAsistente, addAsistente,getAsistentesEvento } = require("../controllers/evento")
const eventosRouter = require("express").Router()

eventosRouter.get("/", getEventos)
eventosRouter.get("/:id", getEventoById)
eventosRouter.post("/", isAuth, upload.single('imagen'), postEvento)
eventosRouter.put("/:id", isAuth,upload.single("imagen"), updateEvento)
eventosRouter.delete("/:id", isAuth, deleteEvento)
eventosRouter.put("/:id/asistentes", isAuth, addAsistente)
eventosRouter.delete("/:id/asistentes/:userId", isAuth, quitarAsistente)
eventosRouter.get("/:id/asistentes", isAuth, getAsistentesEvento)


module.exports = eventosRouter