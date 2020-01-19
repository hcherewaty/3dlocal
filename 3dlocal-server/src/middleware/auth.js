'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models');

//make sure user is logged in with a valid token - Authentication
exports.loginRequired = function(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1]; //get token after Bearer
        jwt.verify(token, process.env.SECRET, function(err, payload){
            if(payload){
                //success
                return next();
            } else {
                //someone either isn't logged in or is trying something tricksy...
                return next({
                    status: 401,
                    message: 'Hey! You have to be logged in to do that! 🙅‍♀️'
                });
            }
        })
    } catch(err){
        return next({
            status: 401,
            message: 'Hey! You have to be logged in to do that! 🙅‍♀️'
        });
    }
};


//make sure we have the correct user for an action - Authorization
exports.validateUser = function(req, res, next){
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET, function(err, payload){
            //if the token is valid and the id in the token is the same as the id in the URL, then the user is good to go:
            if(payload && payload.id === req.params.id){
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Unauthorized! Unauthorized! You\'ed have to be so and so to do that.'
                });
            }
        })
    } catch(err){
        return next({
            status: 401,
            message: 'Unauthorized! Unauthorized! You\'ed have to be so and so to do that.'
        });
    }
};

exports.loginChecker = function(req, res, next){
    try {
        if(!req.headers.authorization){
            return next();
        } else {
            if(req.headers.authorization){
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, process.env.SECRET, function(err, payload){
                    if(payload){
                        return next();
                    } else {
                        //someone either isn't properly logged in and may be trying something tricksy...
                        return next({
                            status: 401,
                            message: 'Hey! You might want to login if you want to view this page... just sayin\'. 🤨'
                        });
                    }
                })       
            }
        }
    } catch(err){
        return next({
            status: 401,
            message: 'Hey! You have to be logged in to do that! 🙅‍♀️'
        });
    }
};