<h1 align="center">PlotPals</h1>

## Description

This project is a media management application built to render movies and tv-shows. It will allow users to create and manage media entries such as movies and TV shows. It features a dynamic form built with React where users can input details like title, description, pick genres, release date, and other media-specific fields such as rating/length for movies, episode numbers/status for TV shows. Validation is handled server-side using Mongoose schema validations, this is to ensure robust error handling and data integrity. The UI uses React-Select for multi-select genre inputs and includes conditional rendering based on the selected genre type.

User authentication is integrated to restrict access from unauthorized users, such as, unable to edit/delete media that you personally do not own. Overall, the project demonstrates the creation of a responsive, user-friendly CRUD interface with complex form handling.

This was created with React, JavaScript, CSS, Mongoose / MongoDB, React-Select, React Router, Axios, and Node.js/Express

Front-end: https://github.com/Ryziou/PlotPals-Frontend  
Back-end: https://github.com/Ryziou/PlotPals-Backend


## Deployment link

[Click here to try out the PlotPals website!](https://plotpals.netlify.app/home)

## Getting Started/Code Installation

1. Clone the front-end repository to your local machine. 
2. Open VSC with the folder as a main in terminal and input "npm run dev" into it.
    - Add a .env file and add this key "VITE_API_BASE_URL=https://plotpalsapi.netlify.app/api" OR, you can clone the back-end as well and then rename the URL to your localhost URL. 
3. Open up your web browser and go to http://localhost:5173/ to start trying it out.


## Timeframe & Working Team (Solo/Pair/Group)

This project started on 13/05/2025 and I was in a duo team with [Harry Lippa](https://github.com/JustHarry11) on this. It was completed on 21/05/2025.<date>


## Technologies Used

### Front End
    - React
    - React Router
    - React-Select
    - CSS
    - JavaScript

### Back End / Development Tools
    - Dependencies (bcryptjs, cloudinary, cors, dotenv, express, jsonwebtoken, mongoose, morgan, multer, multer-storage-cloudinary, serverless-http)
    - Javascript
    - MongoDB / Mongoose
    - Express
    - Visual Studio Code
    - Git & GitHub
    - Windows Subsystem for Linux (WSL) with Ubuntu
    - Zsh (Z Shell) + Oh My Zsh
    - Node.js & npm

### External websites used for researching or use

#### Researching & Images

[Google](https://www.google.com/)  
[MDN Web Docs](https://developer.mozilla.org/en-US/)  
[Cloudinary for Image Hosting](https://cloudinary.com/)  
[Mongoose Docs](https://mongoosejs.com/docs/guide.html)  
[Express Node.js](https://expressjs.com/en/5x/api.html)  
[Code Academy](https://www.codecademy.com/)  
[React](https://react.dev/reference/react)  
[React Router](https://reactrouter.com/home)  
[React Select](https://react-select.com/)  

#### Others
[MongoDB for Database Hosting](https://www.mongodb.com/)  
[ChatGPT for Seed DB](https://chatgpt.com/)  
[Netlify for Serverless Hosting](https://www.netlify.com/)


## Brief

### MVP (Minimum Viable Product)
- The back-end application is built with Express and Node.
- The front-end application is built with React.
- MongoDB is used as the database management system.
- The back-end and front-end applications implement JWT token-based authentication to sign up, sign in, and sign out users.
- Authorization is implemented across the front-end and back-end. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
- The project has at least two data entities in addition to the User model. At least one entity must have a relationship with the User model.
- The project has full CRUD functionality on both the back-end and front-end.
- The front-end application does not hold any secret keys. Public APIs that require secret keys must be accessed from the back-end application.
- The project is deployed online so that the rest of the world can use it.



## Planning
<details>
    <summary>Wireframes</summary>
Main

![Media Whole Wireframe](https://res.cloudinary.com/dit5y4gaj/image/upload/v1747827437/db68fa31-894b-4600-a4f5-bb6b6e91d781.png)

Profile

![Show Page](https://res.cloudinary.com/dit5y4gaj/image/upload/v1747827643/fae37881-c769-4035-9a07-09c6663079c7.png)

Google Doc

[Details of a to do list](https://docs.google.com/document/d/1qf9pjkaJSSwG_spn_gEUxpAEJRhszXy2qO2qqkmLnf4/edit?usp=sharing)

ERD

![Models/Schemas ERD](https://res.cloudinary.com/dit5y4gaj/image/upload/v1747827727/f42a4830-82ff-4f76-9082-d85c625c6360.png)

Pair Project

This project was collaboratively planned with [Harry Lippa](https://github.com/JustHarry11). Together, we worked on the initial wireframes in excalidraw which was to outline the structure and user flow of the application. While building out the wireframe, I worked on the Entity Relationship Diagram (ERD) to map out our data models. I recreated the wireframe for the Media Show page as I wanted to be more precise on what goes into it. We then outlined our to-do list etc into a google doc above to simplify our trello cards and easier to delegate tasks out to both of us.

## Backend

Callum:

    - Created backend and frontend GitHub repositories.

    - Set up the initial Express server structure and added all required dependencies.

    - Connected the application to MongoDB Atlas.

    - Defined the Media model and created the seed database.

    - Created authentication middleware to protect routes.

    - Defined the Genre model with virtual fields.

    - Created both Media and Genre controllers.

    - Applied and tested authentication middleware on appropriate routes.

    - Updated the Media model with validation rules.

    - Extended login functionality to accept either username or email.

Harry:

    - Defined the User model.

    - Created User controller with login/register functionality.

    - Implemented the global errorHandler middleware and error.js utilities.

    - Created the Favourites controller to manage user favourite media.

## Frontend

Callum:

    - Set up base file structure for the initial commit to ensure project consistency.

    - Created and configured Axios services for Media, Favourites, and Genres.

    - Built full CRUD components for Media (Index, Show, Create, Delete, Update).

    - Developed the reusable MediaCard component used across multiple pages (Home, Index, Genre).

    - Styled Media components such as (Home page, Index, Create, Update, MediaCard)and the User Favourites component using CSS.
    
    - Created the footer component to display the credentials of team members.

Harry:

    - Created and implemented Login/Register forms and authentication services.

    - Developed and styled the Navigation Bar.

    - Set up JWT token handling with localStorage for authentication.

    - Created the reusable useFetch custom hook for data fetching.

    - Built Favourite components for the home page and the user's favourites section.

    - Built Genre components (Index and Show) to display media by genre.

    - Created the reusable ErrorMessage component for form and API error handling.

    - Implemented functionality to favourite/unfavourite a media item.

    - Styled the MediaShow component.

</details>

## Build/Code Process

### Advanced Mongoose Schema with Conditional Validation
One of the core foundations of this project was creating a robust data model that could handle both movies and TV shows while enforcing different validation rules based on the media type. I realised near the end of the 1 week project that the user is able to skip certain parts when creating/editing and they would run into issues due to this. So I pretty much wanted to solidify the requirements for each field and it became like this:

```jsx
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
```
I'm very proud of the conditional validation logic implemented in this schema. Rather than attempting to create very complicated front-end logic, I designed a unified schema that adapts its validation rules based on the type field. This approach offers several advantages:

1. Conditional Required Fields: I used function expressions in the required property to make certain fields mandatory only for specific media types. For example, rating and length are required only for movies, while episodeNum and status are required only for TV shows.
2. Custom Validators: For fields like length and episodeNum, I implemented custom validation functions that not only check if the value is greater than zero but also intelligently skip validation when the field isn't relevant to the media type.
3. Detailed Error Messages: Each validation rule includes a specific error message that clearly communicates what went wrong, making the API much more user-friendly for front-end developers working with the data.
4. Relationships: The schema incorporates relationships with other collections through references (ref), establishing connections between media items, genres, and users who created or favorited the content.

The conditional validation approach ensures data integrity without requiring duplicate code or separate models for different content types.


### Reusable Media Card Component
One of the key components I developed for this project was a versatile MediaCard component that could dynamically display different types of media content (movies or TV shows) through multiple pages of the application:

```jsx
import { Link } from 'react-router'

export default function MediaCard({ media }) {
    
    return (
        <div className="media-card">
        <Link to={`/medias/${media._id}`}>
            <img src={media.imageUrl} alt={media.title} className='media-image'/>
        </Link>
            <div className="media-content">
            <Link to={`/medias/${media._id}`}>
                <h2 className="media-title">{media.title}</h2>
            </Link>
                <div className="media-details">
                    {media.type === 'movie' ? (
                        <>
                            <div className="media-top-row">
                                <span>⭐{media.rating}</span>
                                <span>❤️{media.favourites.length}</span>
                            </div>
                            <div className="media-bottom-row">
                                <span>🎞️{media.length} mins</span>
                                <span>{media.releaseDate}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="media-top-row">
                                <span>📺{media.episodeNum} Ep</span>
                                <span>❤️{media.favourites.length}</span>
                            </div>
                            <div className="media-bottom-row">
                                <span>{media.status.charAt(0).toUpperCase() + media.status.slice(1)}</span>
                                <span>{media.releaseDate}</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="media-genres">
                    {media.genres.map(genre => (
                        <Link key={genre._id} to={`/genres/${genre._id}`}>
                        <span  className='genre-tag'>{genre.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
```
This component highlights my approach to creating reusable UI elements that adapt based on the data they receive. I'm particularly proud of how I implemented conditional rendering based on the media type, allowing the same card to display different information for movies versus TV shows.

For movies, the card displays ratings and runtime, while for TV shows it shows episode count and status. I used the ternary operator (media.type === 'movie' ? ... : ...) to elegantly handle this conditional rendering without duplicating the entire card structure.

Another feature I implemented was making the genres clickable, which allows users to navigate to genre-specific pages. By wrapping each genre tag in a React Router Link component, I enhanced the navigation flow throughout the application while maintaining a clean and intuitive UI. This approach significantly improved the user experience by creating natural pathways for content discovery.

### Dynamic Multi-Select for Genres
One of the more challenging aspects of the project was implementing a multi-select dropdown for genre selection in the media creation form. I used the React-Select library to create an intuitive interface for users to select multiple genres for their media entries:


```jsx
const [genres, setGenres] = useState([])

function handleGenreChange(selectedOptions) {
    const selectedIds = selectedOptions.map(genreChange => genreChange.value)
    setFormData({ ...formData, genres: selectedIds})
}

useEffect(() => {
async function getGenres() {
    try {
    const { data } = await genreIndex()
    setGenres(data)
    } catch (error) {
    setError({ ...error, preload: 'Failed to load genres' })
    }
}
getGenres()
}, [])

<div className="input-control-create">
    <label htmlFor="genres">Genres</label>
    <Select
        isMulti
        name='genres'
        placeholder="Select genres..."
        className='input-genre'
        options={genres.map(genre => ({ value: genre._id, label: genre.name }))}
        value={genres
        .filter(genre => formData.genres.includes(genre._id))
        .map(genre => ({ value: genre._id, label: genre.name }))
        }
        onChange={handleGenreChange}
    />
    {error.genres && <p className='error-message-create'>{error.genres}</p>}
</div>
```
This implementation showcases my ability to work with form state management in React. The complexity came from needing to:

1. Fetch available genres from the backend when the component mounts (using the useEffect hook)
2. Transform the raw genre data into the format expected by React-Select (mapping to {value, label} objects)
3. Track selected genres in the form state
4. Handle changes when users select or deselect genres

I'm particularly proud of how I solved the two-way binding between the form state and the Select component. The value prop uses a combination of filtering and mapping to display the currently selected genres, while the handleGenreChange function updates the form state with just the IDs of selected genres.

This approach ensures that the data structure remains clean when sending to the backend (just an array of IDs), while still providing a rich, user-friendly interface. It also includes error handling both for the initial data fetch and validation feedback for the user if they don't select required genres.


## Challenges

### Media Schema Nightmare: Adding Requirements in a Different Method
This part took me a good portion of my time. It honestly nearly broke my brain 😅. Creating a single schema that could handle both movies and TV shows was the easiest part, but having them need different requirements felt like solving a Rubik's cube blindfolded.

Movies needed ratings and length while TV shows needed episode numbers and a status - and I kept running into walls trying to make this work with the validate method.

After hours of Googling, reading through Mongoose docs, and talking to my instructor, I discovered you could use functions like the 'validate' and 'enum' fields while also utilising functions in 'required' fields:

```js
type: {type: String, required: [true, 'Please provide the type of media'], enum: ['movie', 'tvshow']},

required: [function() {
    return this.type === 'movie'
}, 'Please provide a rating for the movie']

```
This code snippet allows the type to be a conditional requirement that the ```type``` must be considered a ```movie``` or ```tvshow```. I did have to add square brackets ```[]``` to this function so that I could add a custom message to the user, otherwise it would only give back "Path 'rating' is requred." messages.

The next part of the Schema Nightmare is doing the validate fields:

```jsx
validate: {
    validator: function(value) {
        if (this.type !== 'movie') return true
        return value > 0
    },
    message: 'Movie length must be greater than 0'
}
```

Funny enough, this one is the easiest. You simply define the function and then do a simple ```if``` statement. You ask if the ```type``` is NOT equal to ```movie``` then we skip validation by returning ```true```. If it is a ```movie``` then we require that field to be greater than 0. We then return a message if it falls under ```false```.

The hardest one for my brain was this one:

```jsx
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
```
I did add validate fields previously but I ran into multiple issues like, if the user picked ```movie``` then this would always get called for some reason due to the enum part. After messing around with it for a good amount of time, I had figured I needed to either
1. Empty these fields
2. Delete these fields

Emptying is kinda pointless as the default useState considers each field as empty already, so in the end I went with #2 and added this part in the creation page
```jsx
const newFormData = {...formData}

if (newFormData.type === 'movie') {
    delete newFormData.episodeNum
    delete newFormData.status
}

if (newFormData.type === 'tvshow') {
    delete newFormData.rating
    delete newFormData.length
}
```
Thankfully this skipped validation errors by creating a copy of the ```formData``` object, It then checks the ```type``` field. If it's ```movie``` then delete the ```tvshow``` fields, if it's ```tvshow``` then delete the ```movie``` fields. This cleans up data before sending the object to the backend.

## Wins

### Dream Team: Working with my Duo Partner
Working with my duo partner proved to be one of the best wins of this project; [Harry](https://github.com/JustHarry11). Our collaboration was characterised by:
1. Strong communication that made problem-solving more efficient
2. Similar coding mistakes that allowed us to identify common mistakes
3. A supportive environment where we could troubleshoot these issues together with

### Server-side validation
It's already part of the build process and challenges but it's still one of my wins that I implemented server-side validation with Mongoose and connected it to avoid client-side error rendering in React.

### React-Select
Another win would be the usage of ```react-select```. I got informed about this by my instructor and went to go research more about it, I ended up creating a dynamic multi-select genre field which greatly improved the user experience when selecting genres for their media.

## Key Learnings/Takeaways


- I now feel more confident when using React hooks like useState, useEffect, and useContext to manage data and app flow.

- I learnt how to structure form validation on both the front-end and now the back-end due to the usage of the ```validate``` and ```enum``` fields.

- I have improved and got more comfortable with working with Mongoose schemas, especially setting up nested and referenced data like genres and users.

- Practicing Git collaboration, regular commits, and managing my tasks via Trello for simple project management

## Bugs

- Image uploads are currently handled as file inputs but the server expects a URL. This can definitely cause some confusion or unexpected behaviour on the back-end and front-end.

## Future Improvements

- Add user authentication UI feedback (like redirecting to a welcome page after logging in, or a profile page)
- Add a nice little gif for loading states so it's not just generic text saying "Loading..."
- Comment and review system to let users be able to leave comments or reviews on each media item
- Add a robust search function that would allow users to find media by, not just genres but the title, or release date.
- Add a light mode for users who dislike dark mode
- Optimize the media cards for smaller screens
