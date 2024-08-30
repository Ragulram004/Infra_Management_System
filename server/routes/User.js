import express from 'express'
//controller functions
import { loginUser } from '../controllers/UserController.js'

const router = express.Router()

//login route
router.post('/login', loginUser)

export default router