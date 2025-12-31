const express = require('express')
const router = express.Router()
const {handleUserSignUp,handleUserLogin} = require("../controllers/user.js") 

router.post('/register',handleUserSignUp)
router.post('/login',handleUserLogin)
router.get('/profile',)



module.exports = router