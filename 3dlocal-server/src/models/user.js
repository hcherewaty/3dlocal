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
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    zipcode: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    usertype: {
        type: String,
        required: true,
        enum: ['Maker', 'Seeker', 'Both']
    }
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
userSchema.method.comparePasswords = async function(passwordFromUserInput, next){
    try {
        let isMatch = await bcrypt.compare(passwordFromUserInput, this.password);
        return isMatch;
    } catch(err){
        return next(err);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;