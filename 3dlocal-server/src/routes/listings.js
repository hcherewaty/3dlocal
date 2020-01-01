'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { createListing } = require('../handlers/listings');

//prefix: /api/users/:id/listings
router.route('/')
    .post(createListing);

module.exports = router;