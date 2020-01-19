'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const listingsRoutes = require('./routes/listings');
const { loginRequired, validateUser } = require('./middleware/auth');
const db = require('./models');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/listings', loginRequired, validateUser, listingsRoutes);
app.get('/api/listings', async function(req, res, next){
    try {
        if(!req.headers.authorization){
            let listings = await db.Listing.find()
            .sort({createdAt: 'desc'})
            .populate('user', {
                username: true 
            });
            return res.status(200).json(listings);
        } else {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.SECRET, async function(err, payload){
                if(payload){
                    //success
                    let listings = await db.Listing.find()
                    .sort({createdAt: 'desc'})
                    .populate('user', {
                        username: true,
                        phone: true,
                        zipcode: true,
                        bio: true,
                        profileImageUrl: true 
                });
                return res.status(200).json(listings);
                }
            })       
        }

        // if(loginChecker){
        //     let listings = await db.Listing.find()
        //     .sort({createdAt: 'desc'})
        //     .populate('user', {
        //         username: true,
        //         phone: true,
        //         zipcode: true,
        //         bio: true,
        //         profileImageUrl: true 
        //     });
        //     return res.status(200).json(listings);
        // } else {
        //     let listings = await db.Listing.find()
        //     .sort({createdAt: 'desc'})
        //     .populate('user', {
        //         username: true 
        //     });
        //     return res.status(200).json(listings);
        // }
    } catch(err){
        return next(err);
    }
});

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