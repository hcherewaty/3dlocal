'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { getProfile } = require('../handlers/profiles');


router.route('/:user_id')
    .get(getProfile);

module.exports = router;