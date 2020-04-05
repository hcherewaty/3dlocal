'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const { getUser, updateUser } = require('../handlers/user');


router.route('/')
    .get(getUser)
    .put(updateUser);

module.exports = router;