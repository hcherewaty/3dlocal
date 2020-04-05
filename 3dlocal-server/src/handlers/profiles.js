'use strict';

const db = require('../models');

exports.getProfile = async function(req, res, next){
    try {
        let userId = req.params.user_id
        let foundUser = await db.User.findById(userId);
        let userDetails = {
            id: foundUser.id,
            username: foundUser.username,
            zipcode: foundUser.zipcode,
            email: foundUser.email,
            phone: foundUser.phone ? foundUser.phone : 'None.'
        }
        return res.status(200).json(userDetails);
    } catch(err){
        return next(err);
    }
};