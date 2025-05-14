import serverless from 'serverless-http'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'dotenv/config'
import cors from 'cors'

import authRouter from '../../controllers/auth.js'
import mediaRouter from '../../controllers/medias.js'
import favouriteRouter from '../../controllers/favourite.js'
import genresRouter from '../../controllers/genres.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use('/api', authRouter)
app.use('/api', mediaRouter)
app.use('/api', favouriteRouter)
app.use('/api', genresRouter)

app.use('/{*any}', (req, res) => {
    return res.status(404).json({ message: 'Route not found' })
})


const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected');

    } catch (error) {
        console.log(error);
    }
}

startServers()

export const handler = serverless(app, {
  request: (req, event) => {
    if (typeof event.body === 'string') {
      try {
        req.body = JSON.parse(event.body);
      } catch (err) {
        req.body = {};
      }
    }
  }
});