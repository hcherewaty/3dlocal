'use strict';

const db = require('../models');
// const { sanitize } = require('./sanitize');

exports.createListing = async function(req, res, next){
    //create listing
    try {
        // let sanitizedListing = sanitize(req);
        let listing = await db.Listing.create({
            title: req.body.title,
            modeling: req.body.modeling,
            description: req.body.description,
            status: req.body.status,
            user: req.params.id
        });
        // let sanitizeUser = sanitize(req);
        let foundUser = await db.User.findById(req.params.id);
        foundUser.listings.push(listing.id);
        await foundUser.save();

        let foundListing = await db.Listing.findById(listing._id).populate('user', {
            username: true,
            phone: true,
            zipcode: true,
            bio: true,
            profileImageUrl: true,
            status: true
        });
        return res.status(200).json(foundListing);
    } catch(err){
        return next(err);
    }
};

// GET /api/users/:id/listings/:listing_id
exports.getListing = async function(req, res, next){
    try {
        // let sanitizeListing = sanitize(req);
        let listing = await db.Listing.findById(req.params.listing_id);
        return res.status(200).json(listing);
    } catch(err){
        return next(err);
    }
};

//GET /api/listings
exports.getAllListings = async function(req, res, next){
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
        // let sanitizeListing = sanitize(req);
        let foundListing = await db.Listing.findById(req.params.listing_id);
        await foundListing.remove();
        return res.status(200).json(foundListing);
    } catch(err) {
        return next(err);
    }
};

//edit listing
exports.editListing = async function(req, res, next){
    try {
        let listingId = req.params.listing_id;
        let updateContent = req.body
        let editListing = await db.Listing.update({
            _id: listingId
        },
        {
            $set: {
                title: updateContent.title,
                modeling: updateContent.modeling,
                description: updateContent.description,
            }
        });
        return res.status(200).json(editListing);
    } catch(err){
        return next(err);
    }
};
