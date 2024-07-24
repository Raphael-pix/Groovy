const {fetchFavourites,addSongToFavourites,removeSongFromFavourites}=require('../controller/favourites-controller')
const {addUser,signinUser} = require('../controller/users-contoller')
const express = require('express')

const router = express.Router()

router.get('/favourites',fetchFavourites)
router.post('/add',addSongToFavourites)
router.delete('/remove/:id',removeSongFromFavourites)
router.post('/signup',addUser)
router.post('/login',signinUser)

module.exports = router