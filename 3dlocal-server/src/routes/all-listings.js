'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { getAllListings } = require('../handlers/listings');

router.route('/')
    .get(getAllListings);

module.exports = router;