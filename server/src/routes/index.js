const express = require('express')

const router = express.Router()
const { auth } = require ("../middleware/auth")
const {uploadFile} = require('../middleware/uploadFile')


const {register, login, checkAuth} = require("../controller/auth")
const {addFilm, getFilm, getFilmById} = require('../controller/film') 
const{ getCategory } = require('../controller/category')
const { addTransaction, getTransactionbyId, getTransaction, updateTransaction, getTransactionbyIdFilm } = require('../controller/transaction')
const { getUserId } = require('../controller/users')

router.post("/register", register)
router.post("/login", login)
router.get("/check-auth", auth , checkAuth);
router.get('/user/:id', auth, getUserId)

router.get('/category', getCategory)

router.get("/film", getFilm)
router.get("/film/:id", getFilmById)
router.post('/film', uploadFile('thumbnail'), addFilm)

router.post("/transaction", auth, uploadFile('transferProof'), addTransaction)
router.get('/transaction/:id', auth, getTransactionbyId)
router.get('/transaction', getTransaction )
router.patch('/transaction/:id', updateTransaction )
router.get('/filmTransaction/:id',auth, getTransactionbyIdFilm)



module.exports = router