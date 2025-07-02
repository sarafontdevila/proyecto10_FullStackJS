const { generateToken } = require('../../utils/jwt')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('preferidos')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('error')
  }
}
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('preferidos')
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json('error')
  }
}
const register = async (req, res, next) => {
  try {
    const userduplicated = await User.findOne({ nombre:req.body.nombre,email: req.body.email })
    if (userduplicated) {
      return res.status(400).json('Usuario ya existe')
    }
    const newUser = new User ({
      nombre:req.body.nombre,
      email:req.body.email,
      password:req.body.password,
      rol:"user"
    })
    const user = await newUser.save()
    const token = generateToken(user._id)

    return res.status(200).json({
      user,
      token
    })
  } catch (error) {
    return res.status(400).json('error')
  }
}
const login = async (req, res, next) => {
  try {
    const {email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json('Usuario o contraseña no encontrado')
    }
    if (bcrypt.compareSync(password, user.password)){
      const token = generateToken(user._id)
      return res.status(200).json({ token, user })
    }
      return res.status(400).json('Contraseña o usuario incorrecta')

  } catch (error) {
    return res.status(400).json('error')
  }
}
/*const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params  

    if (req.user._id.toString() !== req.params.id){
      return res.status(400).json('No puedes actualizar otro usuario')
    }
    const oldUser = await User.findById(id)
    const newUser = new User(req.body)
    newUser._id = id
    newUser.preferidos = [...oldUser.preferidos, ...newUser.preferidos]
    const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true })
    return res.status(200).json(userUpdated)

  } catch (error) {
    return res.status(400).json('error')
  }
}*/
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { preferidoId } = req.body 

    if (req.user._id.toString() !== id) {
      return res.status(403).json('No puedes actualizar otro usuario')
    }

    const evento = await Evento.findById(preferidoId)
    if (!evento) {
      return res.status(404).json('Evento no encontrado')
    }

    const user = await User.findById(id)

    if (!user.preferidos.includes(preferidoId)) {
      user.preferidos.push(preferidoId)
      await user.save()
    }

    const updatedUser = await User.findById(id).populate('preferidos')
    return res.status(200).json(updatedUser)

  } catch (error) {
    console.error(error)
    return res.status(400).json('Error al actualizar usuario')
  }
}



module.exports = { getUsers, getUserById, register, updateUser, login }
