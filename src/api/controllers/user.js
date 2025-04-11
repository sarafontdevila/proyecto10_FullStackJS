const User = require("../models/user")
const bcrypt = require ("bcrypt")

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const getUserById = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const register = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const login= async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}
const updateUser = async (req, res) => {
  try {
    
  } catch (error) {
    return res.status(400).json("error")
    
  }
}

module.exports = { getUsers, getUserById, register, updateUser, login }