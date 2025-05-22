### Description

This is the penultimate project of the bootcamp where we have to build a full stack project. We will build a API using Express and Node and secured with JWT and interact with that API using MongoDB to be able to have full CRUD on the app


### Deployment link

myplotpals.netlify.app


### Getting Started/Code Installation

1. Download PlotPals-Frontend-Harry from Github
2. In the terminal Run NPM I to install all the dependencies
3. Create a .env file and inside add VITE_API_BASE_URL=https://myplotpalsapi.netlify.app/api
4. In the terminal Run npm run dev
5. Follow the link to the Page


### Timeframe & Working Team (Solo/Pair/Group)

Callum and I worked on this project in a pair, we got put into our team on Tuesday 13th May and the deadline for the project is Thursday 22nd May. Callums GitHub repo is https://github.com/Ryziou


### Technologies Used


Back End:
    JavaScript
    Netlify
    Bcryptjs
    Cors
    Dotenv
    Express
    JsonWebToken
    Mongoose
    Morgan
    Multer
    Multer-storage-cloudinary
    Serverless-http

Front End:
    React
    React-Dom
    React-Router
    Reach-Select
    Axios

Development Tools:
    Visual Studios
    Zoom
    Postman
    Slack
    Termial
    Cloudinary
    MongoDB
    Trello




### Brief


- The back-end application is built with Express and Node.
- The front-end application is built with React.
- MongoDB is used as the database management system.
- The back-end and front-end applications implement JWT token-based authentication to sign up, sign in, and sign out users.
- Authorization is implemented across the front-end and back-end. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
- The project has at least two data entities in addition to the User model. At least one entity must have a relationship with the User model.
- The project has full CRUD functionality on both the back-end and front-end.
- The front-end application does not hold any secret keys. Public APIs that require secret keys must be accessed from the back-end application.
- The project is deployed online so that the rest of the world can use it.


### Planning


![wireframe](image.png)
This is our initial wireframe of how we wanted the site to look. The top row is what you can see and access if you have signed in and the bottom is if you havnt registered or signed in yet. We were thinking we could create a card for the media which will allow use to keep the theme throughout and display the media neatly. Our aim was to make the website neat and clean and easy to navigate which I believe we achived.

![showpage](image-1.png)
We also created a version of how we wanted to have the show page to look which keeps the theme of the media card but also added all of the details from the individual media.

![ERD](image-2.png)
He is our entity relationship diagram which allowed us to understand how each of the components of the app would work together and where each of the individual files would be placed.

In Trello we set out what need to be done for this project, we then assigned them so we knew what we needed to do. From there we move and Item which we were working on into our tab so we knew which part the other was working on. Once completed and checked they were moved to the completed tab.

## Backend

### Callum:

Created backend and frontend GitHub repositories.
Set up the initial Express server structure and added all required dependencies.
Connected the application to MongoDB Atlas.
Defined the Media model and created the seed database.
Created authentication middleware to protect routes.
Defined the Genre model with virtual fields.
Created both Media and Genre controllers.
Applied and tested authentication middleware on appropriate routes.
Updated the Media model with validation rules.
Extended login functionality to accept either username or email.

### Harry:

Defined the User model.
Created User controller with login/register functionality.
Implemented the global errorHandler middleware and error.js utilities.
Created the Favourites controller to manage user favourite media.
    
## Frontend

### Callum:

Set up base file structure for the initial commit to ensure project consistency.
Created and configured Axios services for Media, Favourites, and Genres.
Built full CRUD components for Media (Index, Show, Create, Delete, Update).
Developed the reusable MediaCard component used across multiple pages (Home, Index, Genre).
Styled Media components such as (Home, Index, Create, Update, MediaCard)and the User Favourites component using CSS.
Created footer to display credentials

### Harry:

Created and implemented Login/Register forms and authentication services.
Developed and styled the Navigation Bar.
Set up JWT token handling with localStorage for authentication.
Created the reusable useFetch custom hook for data fetching.
Built Favourite components for the home page and the user's favourites section.
Built Genre components (Index and Show) to display media by genre.
Created the reusable ErrorMessage component for form and API error handling.
Implemented functionality to favourite/unfavourite a media item.
Styled the MediaShow component.


## Build/Code Process


### Adding/Removing favourites using the Back-End

When I began adding the function which allowed the user to favourite a media object I initially thought of adding it to the front end , using a button which would toggle if the content was liked or not. I couldn't figure out how to get it to work and I soon realised that I needed to add a controller in the backend. SO I added a Post and Delete to the bottom of the media controller as you will only be able to favourite and unfavourite when you are on the specific media page.

```js
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
```

Even though it is a simple way of dealing with the problem, I believe that it made the process of finding the top favourites and how many favourites each media item had. I believe that this is the cause because using the user schema you had the id of the media item saved which allowed it to easily display the favourites of the user.

### Filter for the Favourites

I started off making the home page by displaying all the media which had been favourited, this was quite a simple process and it allowed me to get all the favourited media in one place. Using that each Favourite item had a type I created a const for the favourite shows and favourite movies and filtered them by type, As we wanted it to go from most favourited to least I had to sort those filtered shows and movies. I then used slice so it would only show the top 5 favourited shows and movies. This was later changed to top 6 as we thought it looked neater displaying 

```jsx
import useFetch from '../../hooks/useFetch'
import { favHome } from '../../services/favourites'
import './HomeFavourite.css'
import MediaCard from '../MediaCard/MediaCard'

export default function FavouriteHome() {

    const { data: favourites, isLoading, error } = useFetch(favHome, [])

    const favouriteMovies = [...favourites]
        .filter(favourite => favourite.type === 'movie')
        .sort((a, b) => b.favourites.length - a.favourites.length)
        .slice(0, 6)

    const favouriteTVShows = [...favourites]
        .filter(favourite => favourite.type === 'tvshow')
        .sort((a, b) => b.favourites.length - a.favourites.length)
        .slice(0, 6)

    return (

        <div className="home-container">
            {error
                ? <p className='error-message'>{error}</p>
                : isLoading
                    ? <p className='loading'>Loading...</p>
                    : <>
                        <div className="media-section">
                            <h1 className='home-title'>Favourite Movies</h1>
                            <div className="media-grid">
                                {favouriteMovies.map(media => <MediaCard key={media._id} media={media} />)}
                            </div>
                        </div>

                        <div className="media-section">
                            <h1 className='home-title'>Favourite TV Shows</h1>
                            <div className="media-grid">
                                {favouriteTVShows.map(media => <MediaCard key={media._id} media={media} />)
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}
```
This part was quite satisfying because I was using features which I learnt in the first couple weeks of the course so it was nice to reuse it and incorperate it correctly which my current project.

### Drop down menu

Callum was working on adding a drop down menu as it was something we thought about add if we had time at the end of our project, we did and he came across an issue which was that either the dropdown would stay even if your mouse left the menu or the menu would disapear as soon as you left the button. Testing out multiple different solutions and researching how to fix it I came across two solutions, one was to do it all in the css, as this was a good solution I wanted to figure out a way to do it in jsx.

```jsx
import { NavLink } from "react-router";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../utils/auth";
import './Navbar.css'

export default function NavBar() {

    const [userSettings, setUserSettings] = useState(false)
    const { user, setUser } = useContext(UserContext)

    const hoverProfile = useRef(false)
    const hoverContent = useRef(false)

    const openDropdown = () => setUserSettings(true)

    const handleMouseLeave = () => {
        setTimeout(() => {
            if (!hoverProfile.current && !hoverContent.current) {
                setUserSettings(false)
            }
        }, 100)
    }

    const handleSignOut = () => {
        removeToken()
        setUser(null)
    }


    return (
        <header>
            <div className="top-navigation">
                <div className="nav-left">
                    <div className="brand-logo">
                        <NavLink to="/home">🎥</NavLink>
                    </div>
                    <NavLink to="/medias">Media</NavLink>
                    <NavLink to="/genres">Genre</NavLink>
                </div>
                <div className="nav-middle">
                    <NavLink to="/home">
                        <h1>PlotPals</h1>
                    </NavLink>
                </div>
                <nav className="nav-right">
                    {user
                        ? (
                            <>
                                <div className="profile-dropdown">
                                    <div className="username-toggle" 
                                        onMouseEnter={() => {hoverProfile.current = true; openDropdown()}}
                                        onMouseLeave={() => {hoverProfile.current = false; handleMouseLeave()}}>
                                        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                    </div>
                                    {userSettings && (
                                        <div className="dropdown-content"
                                            onMouseEnter={() => (hoverContent.current = true)}
                                            onMouseLeave={() => { hoverContent.current = false; handleMouseLeave()}}>
                                            <NavLink to="/medias/new" >Add Media</NavLink>
                                            <NavLink to="/favourites" >Your Favourites</NavLink>
                                            <NavLink onClick={() => { handleSignOut() }} to="/login">Sign Out</NavLink>
                                        </div>
                                    )}
                                </div>
                            </>
                        )
                        : (
                            <>
                                <div className="profile-dropdown">
                                    <div className="username-toggle"
                                        onMouseEnter={() => { hoverProfile.current = true; openDropdown(); }}
                                        onMouseLeave={() => { hoverProfile.current = false; handleMouseLeave() }}>
                                        Account
                                    </div>
                                    {userSettings && (
                                        <div className="dropdown-content"
                                            onMouseEnter={() => (hoverContent.current = true)}
                                            onMouseLeave={() => { hoverContent.current = false; handleMouseLeave() }}>
                                            <NavLink to="/register">Register</NavLink>
                                            <NavLink to="/login">Log In</NavLink>
                                        </div>
                                    )}
                                </div>
                            </>

                        )
                    }
                </nav>
            </div>
        </header>
    )
}
```
By using hoverProfile and hoverContent it allowed me to only make the drop down dissapear when the mouse is no longer on both the profile and content. I thought this was a interesting way to deal with the issue but also a very simple way. 


## Challenges

Instructions

Challenges are great for showing your learning journey and problem solving, and this is a section that many engineers will check out. Every day of your engineering career you’ll encounter challenges, this is part of your growth and development. It’s the challenges you encounter that helps you become a stronger and more competent engineer. 

Here you will detail any particular challenges you encountered as you were coding the project. 

Questions to answer here:

What technical challenges did you come across? 
Why were these challenges? 
What problem solving did you do to rectify them?
Team dynamics/ Project management
Tools/Tech you used

Insert your Challenges here:




## Wins


### My Plot Pal

The highlight of this project was working with [Callum](https://github.com/Ryziou). This is because we:

1. Similar errors when we are coding which made it easy to spot any little errors as the other had had something similar
2. Open communication where we could ask each other question and give eachother idea of how to fix problems
3. Had a similar idea of how we wented the projec to look

### Full Stack

I enjoyed the satisfaction I got from being able to complete both sides of a app and basically build something out of nothing.

### UI

I am proud of how our project looked, I believe it looks very similar to our wireframe and it is a project which I am proud of based on that and how easy it is to navigate.


## Key Learnings/Takeaways


- I feel like I have a better understanding about building a API and the process of testing out all of the parts.
- With this I also feel like I understand the importance of PostMan and how easy it is to read
- Working in with GitHub as a group and know to collaberate on a project using branches.
- I feel a lot more confident in dealing with Token and understand how they work.


## Bugs


- The server thinks the files uploaded are URL which are actually images, this coause some trouble in the back-end and front-end

## Future Improvements


- When you register a user it takes you straight to the home page instead of asking you to sign in.
- Increase the number of filters on the media page.
- Combine the media a genre page by creating a filter at the top of the page so you can see if your looking for media or genres.
- Display the main actors and show the films and that they were also in.
