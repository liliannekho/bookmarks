const router = require('express').Router()
const bookmarkCtrl = require('../controllers/bookmarks')
const checkToken = require('../config/checkToken')

router.delete('/:id', checkToken, bookmarkCtrl.destroyBookmark, bookmarkCtrl.respondWithBookmark)

router.put('/:id', checkToken, bookmarkCtrl.destroyBookmark, bookmarkCtrl.respondWithBookmark)

router.post('/', checkToken, bookmarkCtrl.createBookmark, bookmarkCtrl.respondWithBookmark)

module.exports = router