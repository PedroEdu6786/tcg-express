import express, { Router } from 'express'
import { authUser, getUsers, registerUser, updateUserAdmin } from '../controllers/userController'
import { admin, protect } from '../middleware/authMiddleware'

const router: Router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/:id').put(protect, admin, updateUserAdmin)
router.post('/login', authUser)

export { router as userRoutes }
