const {getUsers, getUserById, register, updateUser, login} = require("../controllers/user")
const usersRouter = require("express").Router()

usersRouter.get("/", getUsers)
usersRouter.get("/:id", getUserById)
usersRouter.post("/", register)
usersRouter.put("/:id", login)
usersRouter.delete("/:id", updateUser)

module.exports = usersRouter