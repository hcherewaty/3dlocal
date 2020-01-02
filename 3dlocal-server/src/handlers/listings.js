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

        let foundListing = await db.Listing.findById(listing._id).populate('user', {
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

// GET /api/users/:id/listings/:listing_id
exports.getListing = async function(req, res, next){
    try {
        let listing = await db.Listing.findById(req.params.listing_id);
        return res.status(200).json(listing);
    } catch(err){
        return next(err);
    }
};

exports.findAndSortListings = async function(req, res, next){
    try {
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
    } catch(err){
        return next(err);
    }
};

// DELETE /api/users/:id/listings/:listing_id
exports.deleteListing = async function(req, res, next){
    try {
        let foundListing = await db.Listing.findById(req.params.listing_id);
        await foundListing.remove();
        return res.status(200).json(foundListing);
    } catch(err) {
        return next(err);
    }
};