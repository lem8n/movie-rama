# movie-rama
A social sharing platform where users can share their favorite movies. Each movie has a title and a small description as well as a date that corresponds to the date it was added to the database. In addition it holds a reference to the user that submitted it. Users can also express their opinion about a movie by either likes or hates.

1. After you clone the project for the App execution, open two terminals and follow the instruction bellow:
    - For the client
        - cd client
        - npm install
        - npm start
    - For the client
        - cd server
        - npm install
        - npm run dev
    - Place the .env file inside the server/ directory
  
2. Additional info
    - localhost:3000 is the main url for the client
    - localhost:5000/api is the main url for the server
    - Users APIs
        - apend '/users' to server main url and one of the following paths to use for the actions:
            - /findAll (GET)
            - /logIn (POST)
            - /logOut (GET) ~ authenticationRequired
            - /findById (GET)
    - Movies APIs
        - apend '/movies' to server main url and one of the following paths to use for the actions:
          - /findAll (GET)
          - /addNew (POST) ~ authenticationRequired
          - /updateMovie/:_id (PUT) ~ authenticationRequired
        - For user Authentication purposes I have used the following
          - jwt token
          - User gets authenticated by apending a (limited-time) jwt cookie to his requests when logs in
          - Token gets removed when user logs out
          - .env file contains the TOKEN_SECRET
        - Database:
          - MongoDB
          - You can see the collection schema models on server/db/models
          - mongoose for handling DB queries
          - .env file contains the DB_URL
        - There are three main routes you can append to main client url to see the equivalent pages:
          - '/' ~ Home page 
          - '/log-in' ~ User log in
          - 'new-movie' ~ Add new movie
          - '/sign-up' ~ User sign up
      
3. Technologies and Libraries Used
    - React ( and 'react-router-dom')
    - axios
    - Html & Css
    - moment.js
    - react-alert
    - MaterialUI for faster UI builds (and some other helper libraries revolving around MUI)
    - Node.js
    - express
    - dotenv
    - jsonwebtoken
    - mongoose
    - nodemon
