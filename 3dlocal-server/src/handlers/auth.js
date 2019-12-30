'use strict';

const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next){
    try {
        //find user
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, firstName, lastName, phone, zipcode, profileImageUrl, bio, userType} = user;
        let isMatch = await user.comparePasswords(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                firstName,
                lastName,
                phone,
                zipcode,
                profileImageUrl,
                bio,
                userType
            }, process.env.SECRET);
            return res.status(200).json({
                id,
                username,
                firstName,
                lastName,
                phone,
                zipcode,
                profileImageUrl,
                bio,
                userType,
                token
            });
        } else {
            return next({
                status: 400,
                message: 'Yikes! Invalid username/password. Try again.'
            });
        }
    } catch(err){
        return next({
            status: 400,
            message: 'Yikes! Invalid username/password. Try again.'
        });
    }
}

exports.signup = async function(req, res, next){
    try {
        //create a user
        let user = await db.User.create(req.body);
        let { id, username, firstName, lastName, phone, zipcode, profileImageUrl, bio, userType } = user;
        //create a token
        let token = jwt.sign({
            id,
            username,
            firstName,
            lastName,
            phone,
            zipcode,
            profileImageUrl,
            bio,
            userType
        }, process.env.SECRET);
        return res.status(200).json({
            id,
            username,
            firstName,
            lastName,
            phone,
            zipcode,
            profileImageUrl,
            bio,
            userType,
            token
        });
    } catch(err) {
        //if validation fails, update error message with:
        if(err.code === 11000){
            err.message = 'Whoa. Whoa. Whoa. That username and/or email is already taken. If you\'re a doppleganger, move along, pal. Otherwise, try again!';
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};