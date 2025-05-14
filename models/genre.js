import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true}
}, {
    toJSON: { virtuals: true }
})

genreSchema.virtual('media', {
    ref: 'Media',
    localField: '_id',
    foreignField: 'genres'
})

const Genre = mongoose.model('Genre', genreSchema)

export default Genre