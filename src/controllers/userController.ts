import { Request, Response } from 'express'
import { User } from '../models/userModel'
import { generateToken } from '../utils/generateToken'

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      user: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
    throw new Error('Invalid email or password')
  }
}

// @desc Register new user
// @route POST /api/users/
// @access Public
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    res.status(400).json({ message: 'Invalid user data' })

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({ message: 'User already exists' })
    throw new Error('User already exists')
  }

  const user = await User.create({ name, email, password })

  if (user) {
    res.status(201).json({
      _id: user._id,
      user: user.name,
      email: user.email,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400).json({ message: 'Invalid user data' })
    throw new Error('Invalid user data')
  }
}

// @desc GET all users
// @route POST /api/users
// @access Private/Admin
export const getUsers = async (req: any, res: any) => {
  const users = await User.find({})

  res.json(users)
}

// @desc Update user by id
// @route PUT /api/users
// @access Private/Admin
export const updateUserAdmin = async (req: any, res: any) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.isAdmin = true;
    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
}
