const express =  require("express")
const router = express.Router()
const{loginUser,signinUser}=require('../controllers/userController')

router.post('/login',loginUser)

router.post('/signup',signinUser)

module.exports = router;