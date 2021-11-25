import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import { userRoutes } from './routes/userRoutes'
import { errorHandler, notFound } from './middleware/errorMiddleware'
import { connectDB } from './config/db'

dotenv.config()

connectDB()

const app: Application = express()

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req: Request, res: Response) => {
    res.send('API running')
  })
}

app.use(express.json())

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Running on http://localhost:5000/'))