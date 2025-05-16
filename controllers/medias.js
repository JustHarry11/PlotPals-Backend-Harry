import express from "express";
import Media from "../models/media.js";
import errorHandler from "../middleware/errorHandler.js";
//import isSignedIn from ""
import { NotFound, Forbidden } from "../utils/errors.js";
import isSignedIn from "../middleware/isSignedIn.js";

const router = express.Router()

// * Index
router.get('/medias', async (req, res ) => {
    try {
        const medias = await Media.find()
        return res.json(medias)
    } catch (error) {
        errorHandler(error, res)
    }
})

// * Create
router.post('/medias', isSignedIn, async (req, res) => {
    try {
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
        const media = await Media.findById(mediaId)
        if (!media) throw new NotFound('Media not found')
        return res.json(media)
    } catch (error) {
        errorHandler(error, res)
    }
})

// * Update
router.put('/medias/:mediaId', isSignedIn, async (req, res) => {
    try {
        const { mediaId } = req.params
        const media = await Media.findById(mediaId)

        // ! 404 if media not found
        if(!media) throw new NotFound('Media not found')

        // ! 403 if user not owner of media
        if(!media.owner.equals(req.user._id)) throw new Forbidden()

        const updatedMedia = await Media.findByIdAndUpdate(mediaId, req.body, { new: true })

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

        return res.redirect(`/media/${media._id}`)
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

        return res.redirect(`/media/${media._id}`)
    } catch (error) {
        errorHandler(error, res)
    }
})

export default router