import mongoose, { Schema } from 'mongoose'

const mediaSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Please provide the title'], unique: true},
    description: {type: String, required: [true, 'Please provide the description']},
    imageUrl: {type: String, required: [true, 'Please provide an image']},
    genres: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Genre'}],
        validate: {
            validator: value => value.length >= 1,
            message: 'Please select at least one genre'
        }
    },
    type: {type: String, required: [true, 'Please provide the type of media'], enum: ['movie', 'tvshow']},
    rating: {
        type: Number,
        min: [0, 'Rating must be at least 0'],
        max: [10, 'Rating must be at most 10'],
        required: [function() { 
            return this.type === 'movie'
        }, 'Please provide a rating for the movie']
    },
    length: {
        type: Number, 
        required: [function() {
            return this.type === 'movie'
        }, 'Please provide the length of the movie in minutes'],
        validate: {
            validator: function(value) {
                if (this.type !== 'movie') return true
                return value > 0
            },
            message: 'Movie length must be greater than 0'
        }
    },
    episodeNum: {
        type: Number, 
        required: [function() {
            return this.type === 'tvshow'
        }, 'Please provide the amount of episode numbers for the TV show'],
        validate: {
            validator: function(value) {
                if (this.type !== 'tvshow') return true
                return value > 0
            },
            message: 'Episode number must be greater than 0'
        }
    },
    status: {
        type: String, 
        required: [function() {
            return this.type === 'tvshow'
        }, 'Status must be on-going, completed, or cancelled'],
        enum: {
            values: ['on-going', 'completed', 'cancelled'],
            message: 'Status must be on-going, completed, or cancelled'
        }
    },
    releaseDate: {type: Number, required: [true, 'Please provide the release date']},
    favourites: [{type: Schema.Types.ObjectId, ref: 'User'}],
    owner: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

const Media = mongoose.model('Media', mediaSchema)

export default Media