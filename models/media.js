import mongoose, { Schema } from 'mongoose'

const mediaSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Please provide the title'], unique: true},
    description: {type: String, required: [true, 'Please provide the description']},
    imageUrl: {type: String, required: [true, 'Please provide an image']},
    rating: {type: Number, required: [true, 'Please provide a rating']},
    genres: [{type: Schema.Types.ObjectId, ref: 'Genre', required: [true, 'Please select atleast 1 genre']}],
    episodeNum: {type: Number},
    status: {type: String, required: [true, 'Please provide the status']},
    length: {type: Number},
    type: {type: String, required: [true, 'Please provide the type of media']},
    releaseDate: {type: Number, required: [true, 'Please provide the release date']},
    favourites: [{type: Schema.Types.ObjectId, ref: 'User'}],
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

const Media = mongoose.model('Media', mediaSchema)

export default Media