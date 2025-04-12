const User = require("../api/models/user")
const { verifyToken } = require("../utils/jwt")
const isAuth = async (req, res, next) => {
  try {

    const token = req.headers.authorization
    const parsedToken = token.replace("Bearer ", "")
    
    const { id } = verifyToken(parsedToken)
    const user = await User.findById(id)

    user.password = null
    req.user = user
    next()

  } catch (error) {
    return res.status (400).json("No autenticado")
    
  }
}

module.exports = { isAuth }