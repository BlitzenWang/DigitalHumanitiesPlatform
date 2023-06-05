  
# cds_test

  

A testing site for using Reactjs to build web app for Colby Digital Studies

  

Last Updated: 2023.05.30

Created by Ruize Li @ Colby College East Asian Studies

Modified by Blitzen Wang @ Colby College East Asian Studies
  

## Dependencies

### Front end

JavaScript, HTML, React js

### Backend

Express js, Node js



## Instructions for development and testing

You will first need install `node js`. Go to [nodejs.org](nodejs.org) for downloads and instructions.

You need to start both backend server and front end application to start testing and developing.

To start backend server, do `cd backend` and `node App.js` and you will receive a message in the terminal indicating which port number the server is listening at.

Next, create a new terminal and do `cd cds_test_frontend && npm install` to install all dependencies. When it is done, run `npm start` to start the development server. Make sure that server and front end app are not running at the same port.

  

## Modules

  

- Navbar

- TeachingAndResearch

- Database

- Resources

- About

- MainView

## Checklist for backend -- updated May 2023


 - [ ] find a data storing solution that can handle images, pdfs, and text files.
 - [ ] Connect the data storage to the backend -- time-consuming
 - [ ] Implement keyword searching 
   - [ ] Implement cross-file searching
 - [ ] Decide on the presentation of 
 - [ ] Implement designer-friendly debugging features
 - [ ] Implement backend logic for the home page
 - [ ] Implement backend logic for the teaching & research page
 - [ ] Implement backend logic for about page
 - [ ] Implementing APIs for search functionality
 - [ ] deploy backend at online platform service providers
 - [ ] embed data analysis tools
 - [ ] Implementing monitoring strategy once the website goes live

## Checklist for frontend -- updated May 2023

 - [ ] Design and implement the display search result page
 - [ ] Implement the router for navigating the search results
 - [ ] Design and implement the presentation page of individual pages/ entire volumes.
 - [ ] Design the presentation of images and text for each individual page
 - [ ] Implement the presentation page
 - [ ] Design and implement the home page
 - [ ] Design and implement the Teaching & research page
 - [ ] Refine aesthetics and user experience
 - [ ] deploy frontend at online platform service providers
 - [ ] Display data analytics, possibly integrating voyant.