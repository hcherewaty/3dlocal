'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { getListing, getAllListings } = require('../handlers/listings');

router.route('/:listing_id')
    .get(getListing);

router.route('/')
    .get(getAllListings);

module.exports = router;