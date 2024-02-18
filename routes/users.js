const router = require('express').Router()
const userCtrl = require('../controllers/users')
const CheckToken = require('../config/checkToken')

router.post('/', userCtrl.signUp, userCtrl.respondWithToken)

router.post('/login', userCtrl.login, userCtrl.respondWithToken)

router.get('/bookmarks', checkToken, userCtrl.getBookmarksByUser, userCtrl.respondWithBookmarks)

module.exports = router

