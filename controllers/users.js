requrire('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { getNextKeyDef} = require('@testing-library/user-event/dist/keyboard/getNextKeyDef')
const { useReducer } = require('react')

const signUp = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user)
        res.locals.data.user = user
        res.locals.data.token = token
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne ({ email: req.body.email })
        if(!user) throw new Error('user not found, email invalid')
        const password = crypto.createHmac('sha256', process.env.SECRET).update(req.body.password).split('').reverse().join('')
        const match = await bcrypt.compare(password, user.password)
        if (!match) throw new Error('Password did not match')
        res.locals.data.user = user 
        res.locals.data.token = createJWT(user)
        next()
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const getBookmarksByUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate('bookmarks').sort('bookmarks.createdAt').exec()
        const bookmarks = user.bookmarks
        res.locals.data.bookmarks = bookmarks
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

function createJWT(user){
    return jwt.sign({ user}, process.env.SECRET, { expiresIn: '48h' })
}

module.exports = {
    signUp,
    login,
    getBookmarksByUser
}