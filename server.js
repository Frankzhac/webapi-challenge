require('dotenv').config();
const express = require('express');
const helmet = require('helmet');

// const db = require('../data/dbConfig.js');

const server = express();

server.use(helmet());
server.use(express.json());

const Actions = require('./data/helpers/actionModel');
const Projects = require('./data/helpers/projectModel');

// server check
server.get('/', (req, res) => {
  res.status(200).json({ hello: 'World!' });
});

// Actions endpoint start below

server.get('/actions', async (req, res) => {
    try {
        const actions = await Actions.get();
        res.status(200).json(actions);
    }catch (err) {
        console.log(err);
        res.status(500).json({
          message:"The users information could not be retrieved."
        });
    }
});

// GET by id
server.get('/actions/:id', async (req, res) => {
    try {
        const action = await Actions.get(req.params.id);
        if (action) {
            res.status(200).json(action);
        } else {
            res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({message:'error getting the action!'});
    }
});




server.post('/actions',  async (req, res) => {
    const { description, notes, project_id } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: "Please provide name, notes and project Id for the user"})
    }

    // add/save new user in the actions db
    Actions.insert({
      project_id,
      description,
      notes
    })
        .then(response => {
          res.status(201).json(response);
        })
        .catch(err => {
          // console.log(err);
          res.status(500).json({
            success: false,
            error: "There was an error while saving the user to the database",
          });
        });
});

module.exports = server;
