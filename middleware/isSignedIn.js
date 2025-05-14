import errorHandler from "./errorHandler.js"
import jwt from 'jsonwebtoken'
import User from "../models/user.js"
import { Unauthorized } from "../utils/errors.js"

export default async function isSignedIn(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) throw new Unauthorized()
        
        const token = authHeader.split(' ')[1]
        const { user } = jwt.verify(token, process.env.TOKEN_SECRET)

        const findUser = await User.findById(user._id)
        if (!findUser) throw new Unauthorized()

        req.user = findUser

        next()
        
    } catch (error) {
        errorHandler(error, res)
    }
}