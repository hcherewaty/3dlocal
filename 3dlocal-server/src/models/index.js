'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URI, {
    keepAlive: true,
    useMongoClient:true
});