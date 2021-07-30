 
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import businessRoutes from './routes/businessRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express() 

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/businesses', businessRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes) 
app.use('/api/upload', uploadRoutes)

// app.get('/api/config/paypal', (res) => 
//   res.send(process.env.PAYPAL_CLIENT_ID)
// )

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)


var PORT

if(process.env.NODE_ENV === "development"){
  PORT = 5000
} else {
  PORT = process.env.PORT
}

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)