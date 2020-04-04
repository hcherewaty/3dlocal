'use strict';

const db = require('../models');
const jwt = require('jsonwebtoken');
const { sanitize } = require('./sanitize');

exports.signin = async function(req, res, next){
    //find user
    try {
        console.log('In sign in on server!!! Req body: ', req.body, 'Req params: ', req.params);
        let sanitizedUser = sanitize(req.body);
        if(typeof sanitizedUser.email !== 'string' || typeof sanitizedUser.password !== 'string'){
            return next({
                status: 400,
                message: 'What was that?? Invalid email and/or password. Try again.'
            });
        }
        let user = await db.User.findOne({
            email: sanitizedUser.email
        });
        let { id, username, firstName, lastName, phone, zipcode, profileImageUrl, bio, userType} = user;
        let isMatch = await user.comparePasswords(sanitizedUser.password);
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
                message: 'Yikes! Invalid username/password. Try again. Sign in Error 1.'
            });
        }
    } catch(err){
        return next({
            status: 400,
            message: 'Yikes! Invalid username/password. Try again. Sign in Error 2.'
        });
    }
}

exports.signup = async function(req, res, next){
    //create user
    try {
        let sanitizedUserInfo = sanitize(req.body);
        let userInfo = Object.values(sanitizedUserInfo);
        console.log('In signup on server!!!', 'Req body: ', req.body, 'Req params: ', req.params);
        for(let value of userInfo){
            if(value === undefined){
                return next({
                    status: 400,
                    message: 'Something is wrong with your entries. Try again.'
                });
            }
            if(typeof value !== 'string'){
                return next({
                    status: 400,
                    message: 'What was that?? Invalid email and/or password. Try again.'
                });
            }
        }
        let user = await db.User.create(sanitizedUserInfo);
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