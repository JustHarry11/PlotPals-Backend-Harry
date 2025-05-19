import mongoose from 'mongoose'
import 'dotenv/config'

import User from '../models/user.js'
import Media from '../models/media.js'
import Genre from '../models/genre.js'


// Seed Data
import mediaData from './data/media.js'
import userData from './data/users.js'
import genreData from './data/genres.js'

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB Established')

        // Clearing data
        const deleteUsers = await User.deleteMany()
        const deleteMedia = await Media.deleteMany()
        const deleteGenre = await Genre.deleteMany()
        console.log(`${deleteUsers.deletedCount} users, ${deleteMedia.deletedCount} media, and ${deleteGenre.deletedCount} genres have been deleted`);
        

        // Creating data
        const users = await User.create(userData)
        const genres = await Genre.create(genreData)
        console.log(`${users.length} users and ${genres.length} genres have been added to the database`);
        
        const genreObjects = {}
        genres.forEach(gen => {
            genreObjects[gen.name.toLowerCase()] = gen._id
        })

        const mediaAdditions = mediaData.map((media) => {
            media.owner = users[Math.floor(Math.random() * users.length)]._id
            
            const fixGenres = media.genres.map((name) => {
                return genreObjects[name.toLowerCase()]
            })
            media.genres = fixGenres

            const favouritesNumber = Math.floor(Math.random() * 40) + 1
            let favourites = []
            for (let i = 0; i < favouritesNumber; i++) {
                const seededUser = users[Math.floor(Math.random() * users.length)]
                if (!favourites.includes(seededUser._id)) {
                    favourites.push(seededUser._id)
                }
            }
            media.favourites = favourites
            
            return media
        })
        
        const addMedia = await Media.create(mediaAdditions)
        console.log(`${addMedia.length} medias have been added to the database`);
        
        
        await mongoose.connection.close()
        console.log('Closed MongoDB connection');
        
    } catch (error) {
        console.log(error);
        await mongoose.connection.close()
    }
}

seedData()