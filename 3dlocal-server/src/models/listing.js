'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const listingSchema = new mongoose.Schema({
    modeling: {
        type: String,
        required: true,
        enum: ['Yes', 'No', 'Depends on project']
    },
    machine: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

listingSchema.pre('remove', async function(next){   
    try {
        let user = await User.findById(this.user);
        user.listings.remove(this.id);
        await user.save();
        return next();
    } catch (err) {
        return next(err);
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;