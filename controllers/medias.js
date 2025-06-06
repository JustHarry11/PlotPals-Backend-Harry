import express from "express";
import Media from "../models/media.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFound, Forbidden } from "../utils/errors.js";
import isSignedIn from "../middleware/isSignedIn.js";
import parser from "../middleware/fileParser.js";

const router = express.Router()

// * Index
router.get('/medias', async (req, res ) => {
    try {
        const medias = await Media.find().populate('genres')
        return res.json(medias)
    } catch (error) {
        errorHandler(error, res)
    }
})

// * Create
router.post('/medias', parser.single('imageUrl'), isSignedIn, async (req, res) => {
    try {
        if (req.file) {
            req.body.imageUrl = req.file.path
        }
        req.body.owner = req.user._id
        const media = await Media.create(req.body)
        return res.status(201).json(media)
    } catch (error) {
        errorHandler(error, res)
    }
})

// * Show
router.get('/medias/:mediaId', async (req, res) => {
    try {
        const { mediaId } = req.params
        const media = await Media.findById(mediaId).populate('genres')
        if (!media) throw new NotFound('Media not found')
        return res.json(media)
    } catch (error) {
        errorHandler(error, res)
    }
})

// * Update
router.put('/medias/:mediaId', parser.single('imageUrl'), isSignedIn, async (req, res) => {
    try {
        if (req.file) {
            req.body.imageUrl = req.file.path
        }
        const { mediaId } = req.params
        const media = await Media.findById(mediaId)

        // ! 404 if media not found
        if(!media) throw new NotFound('Media not found')

        // ! 403 if user not owner of media
        if(!media.owner.equals(req.user._id)) throw new Forbidden()

        const fieldsChecker = ['rating', 'length', 'episodeNum', 'status']

        fieldsChecker.forEach(field => {
            if (req.body[field] === '') {
                delete req.body[field]
            }
        })

        if (req.body.type === 'movie') {
            if (!req.body.rating) {
                return res.status(400).json({message: 'Please add rating for the movie'})
            }
            if (!req.body.length) {
                return res.status(400).json({message: 'Please add the movie length in minutes'})
            }
        }

        if (req.body.type === 'tvshow') {
            if (!req.body.status || !['on-going', 'completed', 'cancelled'].includes(req.body.status)) {
                return res.status(400).json({message: 'Status is required and must be on-going, completed, or cancelled for TV Shows'})
            }
            if (!req.body.episodeNum) {
                return res.status(400).json({message: 'Episode number is required for TV Shows'})
            }
        }

        const updatedMedia = await Media.findByIdAndUpdate(mediaId, req.body, { new: true, runValidators: true, context: 'query' })

        return res.json(updatedMedia)

    } catch (error) {
        errorHandler(error, res)
    }
})

// * Delete
router.delete('/medias/:mediaId', isSignedIn, async (req, res) => {
    try {
        const { mediaId } = req.params
        const media = await Media.findById(mediaId)

        if(!media) throw new NotFound('Media not found')

        if(!media.owner.equals(req.user._id)) throw new Forbidden()

        await Media.findByIdAndDelete(mediaId)

        return res.sendStatus(204)
    } catch (error) {
        errorHandler(error, res)
    }
})

// * Add Favourite
router.post('/medias/:mediaId/fav', isSignedIn, async ( req, res ) => {
    try {
        const { mediaId } = req.params
        const media = await Media.findById(mediaId)
        const favourited = media.favourites.find(userId => userId.equals(req.user._id))

        if (!favourited) {
            media.favourites.push(req.user._id)
        }

        await media.save()

        const updatedMedia = await Media.findById(mediaId).populate('genres')

        return res.json(updatedMedia)
    } catch (error) {
        errorHandler(error, res)
    }
})

// * Remove Favourite
router.delete('/medias/:mediaId/fav', isSignedIn, async ( req, res ) => {
    try {
        const { mediaId } = req.params
        const media = await Media.findById(mediaId)
        const favourited = media.favourites.find(userId => userId.equals(req.user._id))

        if (favourited) {
            media.favourites.pull(req.user._id)
        }

        await media.save()

        const updatedMedia = await Media.findById(mediaId).populate('genres')

        return res.json(updatedMedia)

    } catch (error) {
        errorHandler(error, res)
    }
})

export default router