import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import 'dotenv/config'
import cors from 'cors'

import authRouter from './controllers/auth.js'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', authRouter)

app.use('/{*any}', (req, res) => {
    return res.status(404).json({ message: 'Route not found' })
})


const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected');

        app.listen(port, () => console.log('Server is now running'))
    } catch (error) {
        console.log(error);
    }
}

startServers()