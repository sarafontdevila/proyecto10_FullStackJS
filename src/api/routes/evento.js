const { isAuth } = require("../../middlewares/auth")
const upload = require("../../middlewares/file")
const { getEventos, getEventoById, postEvento, updateEvento, deleteEvento, quitarAsistente } = require("../controllers/evento")
const eventosRouter = require("express").Router()

eventosRouter.get("/", getEventos)
eventosRouter.get("/:id", getEventoById)
eventosRouter.post("/", isAuth, upload.single("imagen"), postEvento)
eventosRouter.put("/:id", isAuth,upload.single("imagen"), updateEvento)
eventosRouter.delete("/:id", isAuth,  deleteEvento)
eventosRouter.put("/:id/quitarAsistente", isAuth, quitarAsistente)


module.exports = eventosRouter