const express = require('express')
const router = express.Router()
const {handleUserSignup,handleUserLogin} = require('../controllers/auth.controller.js')

router.post('/register',handleUserSignup)
router.post('/login',handleUserLogin)




module.exports = router