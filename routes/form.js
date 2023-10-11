const express = require('express');
const app = express();// For parsing form data
const path = require('path');

const routes = express.Router()

routes.get('/', (req, res) => {
    console.log("I am called")
    res.sendFile(path.join(__dirname , '../public/home.html'));
  });

  module.exports = routes;
  
  
  