# DISCOURSE
A full stack chat app using React and Express.

## About the App
The purpose of this app is to be able to communicate with other users using an interface similar to that of Slack or Discord.

## Wireframes
Homepage             |  Description
:--------------------------:|:-------------------------:
<img src="https://i.imgur.com/60ow0DL.png" width="2000">   |  This will be a single page application where users can post messages in a channel to respond to other users or send messages directly to a single user.

------------------------------------------------------------------------------------------------------------------------

## Entity Relationship Diagram (ERD)
<img src="https://i.imgur.com/kI2bTqp.png" width="1400">
The user and messages will have a many-to-many relationship. Each channel will have many users. Users will belong to many channels. Each channel will have many messages.

### CRUD	
* CREATE - User will be able to create an account/message
* READ - Users will be able to read past messages
* UPDATE - will be able to edit their messages
* DELETE - will be able to delete their messages

------------------------------------------------------------------------------------------------------------------------

## Component Hierarchy Model
<img src="https://i.imgur.com/XLNqmYk.png" width="1400">

The component heirarchy starts off with the navbar and routes from the App.js. The navbar will remain on each page as different components render, which is why it is under the App.js. The routes significate the number of different links the webpage goes to. Under each links will be components, which will represent the outlook for that page. 

### MVP
* Meet CRUD functionality
* Incorporate auth
* Allow users to message each other


### Post MVP
* Subscribe to channel
* Upload images
* Comment on messages
* Update styling
* Incoming notifications
* Comment threads
* Group messages
* A-frame

## Technologies Used
- Express
- Node.js
- React.js
- PostgreSQL
- JavaScript
- HTML5
- CSS3
- Socket.io

## Deployment
Link will be provided once project is completed: 

If however you fork and/or clone the repo, this is the process to run it:

**Must be done in the root folder:**
```
    npm run db:init           
    npm run db:reset
    npm run db:seed           
    npm start
```            

**Must be done in the client folder:**
```
    npm install
    npm start
```

