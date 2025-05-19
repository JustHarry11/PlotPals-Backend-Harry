import express from 'express'
import User from '../models/user.js'
import { Unauthorized, UnprocessableEntity } from '../utils/errors.js'
import errorHandler from '../middleware/errorHandler.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        if(req.body.password != req.body.passwordConfirmation) {
            throw new UnprocessableEntity('Passwords do not match', 'password')
        }

        req.body.username = req.body.username.toLowerCase()

        req.body.password = bcrypt.hashSync(req.body.password, 12)

        const user = await User.create(req.body)

        return res.status(201).json({ message: `Welcome ${user.username}` })

    } catch (error) {
        errorHandler(error, res)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const userToLogin = await User.findOne({ email: email })

        if (!userToLogin) {
            console.log("User not found")
            throw new Unauthorized()
        }

        if (!bcrypt.compareSync(password, userToLogin.password)) {
            console.log("Passwords do not match")
            throw new Unauthorized()
        }

        const payload = {
            user: {
                _id: userToLogin._id,
                username: userToLogin.username
            }
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '2d' })

        return res.json({ token })

    } catch (error) {
        errorHandler(error, res)
    }
})

export default router