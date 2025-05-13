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

        const deleteUsers = await User.deleteMany()
        console.log(`${deleteUsers.deletedCount} users have been deleted`);
        
        const deleteMedia = await Media.deleteMany()
        console.log(`${deleteMedia.deletedCount} media have been deleted`);

        const users = await User.create(userData)
        console.log(`${users.length} users have been added to the database`);
        
        const genres = await Genre.create(genreData)
        console.log(`${genres.length} genres have been added to the database`);
        
        
        
        await mongoose.connection.close()
        console.log('Closed MongoDB connection');
        
    } catch (error) {
        console.log(error);
        await mongoose.connection.close()
    }
}

seedData()