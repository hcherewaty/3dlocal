'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const listingSchema = new mongoose.Schema({
    modeling: {
        type: String,
        required: true,
        enum: ['I already have a file', 'I need someone to design the model for me', 'Both options apply', 'Not sure']
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    title: {
        type: String,
        required: true,
        maxLength: 100
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }
);

//pre remove hook
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