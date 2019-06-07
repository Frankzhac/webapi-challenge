require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

// const db = require('../data/dbConfig.js');

const server = express();

server.use(helmet());
server.use(express.json());

const Actions = require('./data/helpers/actionModel');
const Projects = require('./data/helpers/projectModel');



module.exports = server;
