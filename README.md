  
# cds_test

  

A testing site for using Reactjs to build web app for Colby Digital Studies

  

Last Updated: 2024.05.23

Created by Ruize Li @ Colby College East Asian Studies

Modified by Blitzen Wang @ Colby College East Asian Studies
  

## Dependencies

### Front end

JavaScript, HTML, React js

### Backend

Express js, Node js



## Instructions for running and testing

You will first need to install `node js`. Go to [nodejs.org](nodejs.org) for downloads and instructions.

You need to start both backend server and front end application to start testing and developing.

To start the frontent server, open up a terminal in VSCode, and use *cd cds_test_frontend && npm install* to access frontend server. Only install the dependencies on your first ever run. Then, use *npm start* to run the front end server. Mind that it uses port 3000 on default.

Next, **open up a new terminal** and use *cd backend* to access the backend server. Then, run *npm run devStart* to start the backend server. The backend runs on port 5000 on default. Make sure that server and front end app are not running at the same port.

You *don't* need to restart the backend server manually every time a change is made. It automatically re-runs when you save anything. 
  

## Pages
  
- Gallery pages
  -Issue
  -Year
  -Page

- Search
  -Search result

- Chatbot

- About

- MainView

## Checklist for backend -- updated August 2023


 - [x] find a data storing solution that can handle images, pdfs, and text files.
 - [x] Connect the data storage to the backend -- time-consuming
 - [x] Implement keyword searching 
   - [x] Implement cross-file searching
 - [x] Decide on the presentation of magazines

 - [ ] Implement designer-friendly debugging features
 - [ ] Implementing APIs for search functionality
 - [ ] deploy backend at online platform service providers
 - [ ] embed data analysis tools

## Checklist for frontend -- updated August 2023

 - [x] Design and implement the display search result page
 - [x] Implement the router for navigating the search results
 - [x] Design and implement the presentation page of individual pages/entire volumes.
 - [x] Design the presentation of images and text for each individual page
 - [ ] Implement the presentation page
 - [x] Design and implement the home page
 - [ ] Design and implement the Teaching & research page
 - [x] Refine aesthetics and user experience
 - [ ] deploy frontend at online platform service providers