'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { createListing, getListing, editListing, deleteListing } = require('../handlers/listings');

//prefix: /api/users/:id/listings
router.route('/')
    .post(createListing)

//prefix: /api/users/:id/listings/:listing_id
router.route('/:listing_id')
    .put(editListing)
    .delete(deleteListing);

module.exports = router;