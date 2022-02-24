const express = require('express')

const router = express.Router()
const { auth } = require ("../middleware/auth")
const {uploadFile} = require('../middleware/uploadFile')


const {register, login, checkAuth} = require("../controller/auth")
const {addFilm, getFilm} = require('../controller/film') 
const{ getCategory } = require('../controller/category')

router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", auth , checkAuth);

router.get('/category', getCategory)

router.get("/film", getFilm)
router.post('/film', uploadFile('thumbnail'), addFilm)



module.exports = router