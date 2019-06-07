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

// ActionModel endpoint start below

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

// Alternation post solution
// server.post('/actions',  async (req, res) => {
//     if (!req.body.description || !req.body.description === '') {
//         res.status(400).json({message:'Please provide valid name'})
//     }
//     try {
//         const action = await Actions.insert({description: req.body.description, notes: req.body.notes, project_id: req.body.project_id});
//         res.status(201).json(action);
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message:'error adding the action!'});
//     }
// });

// uncomment and try alt code only original doesn't work

server.delete('/actions/:id', async (req, res) => {
    try {
        const count = await Actions.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: "The user has been deleted"});
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error removing the user.'});
    }
});

server.put('/actions/:id', async (req, res) => {
    try {
        const action = await Actions.update(req.params.id, req.body);
        if(action) {
            res.status(200).json(action);
        }else {
            res.status(404).json({message: 'could not be found'});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'error updating the action.'});
    }
});


// ActionModel endpoint end here and Projects Models endpoint start

// GET
server.get('/projects', async (req, res) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the project!'});
    }
});

server.get('/projects/:id', async (req, res) => {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({message: 'project not found'});
        }
    }catch (error) {
        console.log(error);
        res.status(500).json({message:'error getting the project!'});
    }
});

module.exports = server;
