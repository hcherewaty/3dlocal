'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    zipcode: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    bio: {
        type: String,
    },
    userType: {
        type: String,
        required: true,
        enum: ['Maker', 'Seeker', 'Both']
    },
    listings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    }]
});

//before saving to db, check if pw is changed and if not save, otherwise hash pw.
userSchema.pre('save', async function(next){
    try {
        if(!this.isModified('password')){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
    } catch(err){
        return next(err);
    }
});

//compare pw from user with pw saved in db.
userSchema.methods.comparePasswords = async function(passwordFromUserInput, next){
    try {
        let isMatch = await bcrypt.compare(passwordFromUserInput, this.password);
        return isMatch;
    } catch(err){
        return next(err);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;