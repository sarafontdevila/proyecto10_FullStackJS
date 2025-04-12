const User = require('../models/user')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json('error')
  }
}
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json('error')
  }
}
const register = async (req, res, next) => {
  try {
    const userduplicated = await User.findOne({ email: req.body.email })
    if (userduplicated) {
      return res.status(400).json('Usuario ya existe')
    }
    const newUser = new User(req.body)
    const user = await newUser.save()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json('error')
  }
}
const login = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error')
  }
}
const updateUser = async (req, res, next) => {
  try {
  } catch (error) {
    return res.status(400).json('error')
  }
}

module.exports = { getUsers, getUserById, register, updateUser, login }
