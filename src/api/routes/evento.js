const { isAuth } = require("../../middlewares/auth")
const upload = require("../../middlewares/file")
const { getEventos, getEventoById, postEvento, updateEvento, deleteEvento } = require("../controllers/evento")
const eventosRouter = require("express").Router()

eventosRouter.get("/", getEventos)
eventosRouter.get("/:id", getEventoById)
eventosRouter.post("/", isAuth, upload.single("imagen"), postEvento)
eventosRouter.put("/:id", isAuth,upload.single("imagen"), updateEvento)
eventosRouter.delete("/:id", isAuth,  deleteEvento)

module.exports = eventosRouter