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

//================================================================================

// let num = '(123)456-7890';

// function validateNum(num){
//     let regex = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;

//     let validateNum = num.replace(regex, '');
//     console.log(validateNum.length);
//     if(validateNum.length != 10){
//         console.log('Phone number is not valid!')
//     } else {
//         console.log('Yay!');
//     }
// }

// validateNum(num);