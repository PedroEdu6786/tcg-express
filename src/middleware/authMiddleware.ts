import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel'

const JWT_SECRET: string = process.env.JWT_SECRET!

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded: any = jwt.verify(token, 'qwerty')

      req.user = await User.findById(decoded.id)

      next()
    } catch (err) {
      console.error(err)
      res.status(401).json({ message: 'Not authorized, token failed' })
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(404).json({ message: 'Not authorized, no token' })
    throw new Error('Not authorized, no token')
  }
}

export const admin = (req: any, res: any, next: NextFunction) => {
  let isAdmin
  if (req.user.isAdmin) {
    isAdmin = true
  } else {
    isAdmin = false
  }

  if (req.user && isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}