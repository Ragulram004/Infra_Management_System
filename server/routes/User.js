import express from 'express'


//controller functions
import { loginUser, LoginViaEmail } from '../controllers/UserController.js'

const router = express.Router()

//login route
router.post('/login', loginUser)
router.post('/loginviaemail', LoginViaEmail);

export default router