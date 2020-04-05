'use strict';

const db = require('../models');

exports.getUser = async function(req, res, next){
    try {
        let userId = req.params.id
        let foundUser = await db.User.findById(userId);
        let userDetails = {
            success: true,
            id: foundUser.id,
            email: foundUser.email,
            username: foundUser.username,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            zipcode: foundUser.zipcode,
            phone: foundUser.phone ? foundUser.phone : '',
            profileImageUrl: foundUser.profileImageUrl,
            bio: foundUser.bio,
            userType: foundUser.userType,
            listings: foundUser.listings
        }
        return res.status(200).json(userDetails);
    } catch(err){
        return next(err);
    }
};

exports.updateUser = async function(req, res, next){
    try {
        let userId = req.params.id
        let updatedUser = req.body
        let updateUser = await db.User.update({
            _id: userId
        },
        {
            $set: {
                email: updatedUser.email,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                zipcode: updatedUser.zipcode,
                phone: updatedUser.phone,
                profileImageUrl: updatedUser.profileImageUrl,
                bio: updatedUser.bio,
                userType: updatedUser.userType
            }
        });
        return res.status(200).json(updateUser);
    } catch(err){
        return next(err);
    }
};
