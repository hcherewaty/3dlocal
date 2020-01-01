'use strict';

const db = require('../models');

exports.createListing = async function(req, res, next){
    try {
        let listing = await db.Listing.create({
            modeling: req.body.modeling,
            machine: req.body.machine,
            hours: req.body.hours,
            price: req.body.price,
            description: req.body.description,
            user: req.params.id
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.listings.push(listing.id);
        await foundUser.save();

        let foundListing = await db.Listing.findById(listing.id).populate('user', {
            username: true,
            phone: true,
            zipcode: true,
            bio: true,
            profileImageUrl: true
        });
        return res.status(200).json(foundListing);
    } catch(err){
        return next(err);
    }
};

exports.getListing = async function(req, res, next){

};

exports.deleteListing = async function(req, res, next){

};

