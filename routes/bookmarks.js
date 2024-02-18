const router = require('express').Router()
const bookmarkCtrl = require('../controllers/bookmarks')
const checkToken = require('../config/checkToken')
const ensureLoggedIn = require('../config/ensureLoggedIn')


router.delete('/:id', checkToken, ensureLoggedIn, bookmarkCtrl.destroyBookmark, bookmarkCtrl.respondWithBookmark)

router.put('/:id', checkToken, ensureLoggedIn, bookmarkCtrl.destroyBookmark, bookmarkCtrl.respondWithBookmark)

router.post('/', checkToken, ensureLoggedIn, bookmarkCtrl.createBookmark, bookmarkCtrl.respondWithBookmark)

module.exports = router