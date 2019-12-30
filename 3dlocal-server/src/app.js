'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
//routes to go here

//error handling - missing route: if these routes can't be reached 👆, do this:
app.use(function(req, res, next){
    let err = new Error('Oops! The tiny computer gnomes that run this website could not find the page you\'re looking for. 🕵️‍♀️🕵️‍♂️');
    err.status = 404;
    next(err);
});

//error handling - shucks, something went wrong with a route:
app.use(errorHandler);

let isRunning = false;

module.exports = {
    server: app,
    start: (port) => {
        if( ! isRunning ) {
            app.listen(port, () => {
                isRunning = true;
                console.log(`Server is running on Port ${port}! 🏃‍♀️`)
            });
        }
        else {
            console.log('Server is already running!');
        }
    },
};