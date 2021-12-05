import { NextFunction, Request, Response } from 'express'


// @desc Middleware for route not found
// @param {Request} req - Request
// @param {Response} req - Response
// @param {NextFunction} next - Next function to continue
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}


// @desc Middleware for errors after a request
// @param {Error} err - Error
// @param {Request} req - Request
// @param {Response} req - Response
// @param {NextFunction} next - Next function to continue
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}
