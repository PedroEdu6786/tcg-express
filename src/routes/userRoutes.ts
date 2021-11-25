import express, { Router } from 'express'
import { authUser, registerUser } from '../controllers/userController'

const router: Router = express.Router()

router.post('/', registerUser)
router.post('/login', authUser)

export { router as userRoutes }
