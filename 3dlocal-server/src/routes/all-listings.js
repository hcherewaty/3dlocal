'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { findAndSortListings } = require('../helpers/listings');

router.route('/')
    .get(findAndSortListings);

module.exports = router;