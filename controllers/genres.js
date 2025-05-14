import mongoose from "mongoose";
import express from "express";
import Genre from "../models/genre.js";
import errorHandler from "../middleware/errorHandler.js";
import { NotFound } from "../utils/errors.js";


const router = express.Router()


router.get('/genres', async (req, res) => {
    try {
        const genre = await Genre.find()

        return res.json(genre)
    } catch (error) {
        errorHandler(error, res)
    }
})

router.get('/genres/:genreId', async (req, res) => {
    try {      
        const genre = await Genre.findById(req.params.genreId).populate('media')
        
        if (!genre) throw new NotFound('Genre not found')

        return res.json(genre)
    } catch (error) {
        errorHandler(error, res)
    }
})


export default router