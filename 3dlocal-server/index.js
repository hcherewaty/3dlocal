'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');

const PORT = 8082;

app.use(cors());
app.use(bodyParser.json());

//routes to go here

//error handling - missing route

//error handling - something went wrong with a route

//run server