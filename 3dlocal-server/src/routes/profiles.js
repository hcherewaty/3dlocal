'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { getProfile, getAllProfiles } = require('../handlers/profiles');

router.route('/')
    .get(getAllProfiles);

router.route('/:user_id')
    .get(getProfile);

module.exports = router;