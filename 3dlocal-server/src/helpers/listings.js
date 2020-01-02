'use strict';

const db = require('../models');

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