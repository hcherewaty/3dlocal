'use strict';

const db = require('../models');
const jwt = require('jsonwebtoken');
// const { sanitize } = require('./sanitize');

exports.signin = async function(req, res, next){
    //find user
    try {
        console.log('In sign in on server!!! Req body: ', req.body);
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, firstName, lastName, phone, zipcode, profileImageUrl, bio, userType, email,
            availability,
            machineType,
            machineMaterial,
            bedSizeL,
            bedSizeW,
            bedSizeD,
            hoursMin,
            hoursMax,
            price,
            details,
            projectImgs} = user;
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
                userType,
                email,
                availability,
                machineType,
                machineMaterial,
                bedSizeL,
                bedSizeW,
                bedSizeD,
                hoursMin,
                hoursMax,
                price,
                details,
                projectImgs
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
                email,
                availability,
                machineType,
                machineMaterial,
                bedSizeL,
                bedSizeW,
                bedSizeD,
                hoursMin,
                hoursMax,
                price,
                details,
                projectImgs,
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
        console.log('Request body: ', req.body)
        let newUser = await db.User.create(req.body);
        let { id, username, firstName, lastName, phone, zipcode, profileImageUrl, bio, userType, email, availability,
            machineType,
            machineMaterial,
            bedSizeL,
            bedSizeW,
            bedSizeD,
            hoursMin,
            hoursMax,
            price,
            details,
            projectImgs } = newUser;
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
            userType,
            email,
            availability,
            machineType,
            machineMaterial,
            bedSizeL,
            bedSizeW,
            bedSizeD,
            hoursMin,
            hoursMax,
            price,
            details,
            projectImgs

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
            email,
            availability,
            machineType,
            machineMaterial,
            bedSizeL,
            bedSizeW,
            bedSizeD,
            hoursMin,
            hoursMax,
            price,
            details,
            projectImgs,
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