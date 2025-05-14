import express from 'express'
import Media from '../models/media.js'
import errorHandler from '../middleware/errorHandler.js'
import isSignedIn from '../middleware/isSignedIn.js'
import { NotFound } from "../utils/errors.js";

const router = express.Router()

// * Home
router.get('/home', async (req, res) => {
    try {
        const favouriteMedia = await Media.find({ favourites: { $ne: [] }}).sort({ favourites: -1 })
        return res.json(favouriteMedia)
    } catch (error) {
        
    }
})

router.get('/favourites', isSignedIn, async (req, res) => {
    try {
        const yourFavouriteMedia = await Media.find({ favourites: req.user._id})

        if(!yourFavouriteMedia.favourites) throw new NotFound('You Have No Favourites')

        return res.json(yourFavouriteMedia)
    } catch (error) {
        errorHandler(error, res)
    }
})

export default router

