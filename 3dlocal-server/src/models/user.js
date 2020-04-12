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
        maxLength: 200
    },
    userType: {
        type: String,
        required: true,
        enum: ['Maker', 'Seeker', 'Both']
    },
    availability: {
        type: String,
        enum: ['3D Printing Only', '3D Modeling Only', 'Both', '']
    },
    machineType: {
        type: String
    },
    machineMaterial: {
        type: String
    },
    bedSizeL: {
        type: Number
    },
    bedSizeW: {
        type: Number
    },
    bedSizeD: {
        type: Number
    },
    hoursMin: {
        type: Number
    },
    hoursMax: {
        type: Number
    },
    price: {
        type: Number
    },
    details: {
        type: String,
        maxlength: 1500
    },
    projectImgs: {
        type: String
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