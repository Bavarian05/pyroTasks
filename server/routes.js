var express = require('express')
var api = express.Router()
var parser = require('body-parser')
var bcrypt = require('bcrypt-nodejs')
var util = require('./utilities')
var db = require('./db')

var storage = {
  username: 'test',
  password: 'test',
  groups: [
    {id: 1, name: 'Group1 Alpha'},
    {id: 2, name: 'Group2 Bravo'},
    {id: 3, name: 'Group3 Charlie'}
  ],
  tasks: [
    [
      // No Group with id 0
    ],
    [
      {id: 100, name: 'Alpha Task1', owner: 'John Smith'},
      {id: 200, name: 'Alpha Task2', owner: 'Jim Johnson'}
    ],
    [
      {id: 300, name: 'Bravo Task1', owner: 'Jane Smith'},
    ],
    [
      // Empty Tasklist for Group3
    ]
  ],
  100: {id: 100, name: 'Alpha Task1', owner: 'John Smith'},
  200: {id: 200, name: 'Alpha Task2', owner: 'Jim Johnson'},
  300: {id: 300, name: 'Bravo Task1', owner: 'Jane Smith'},
}

api.post('/signup', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  if(name !== null && email !== null && password !== null){
    db.query('SELECT * FROM USERS WHERE email = ?;', [email], function(err, rows){
      if(rows.length === 0){
        password = bcrypt.hashSync(password);
        db.query('INSERT INTO USERS SET email = ?, name = ?, password = ?;',
        [email, name, password],
        function(err, rows){
          if(err){
            console.log(err);
            res.sendStatus(500);
          }
          util.createToken(req, res, rows.insertId);
        });
      } else {
        res.sendStatus(409);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

api.post('/login', function(req, res) {
  var name = req.body.name;
  var password = req.body.password;
  if (name !== null || password !== null) {
    db.query('SELECT * from USERS WHERE NAME = ?;', [name], function(err, rows) {
      if (err) {
        console.log(err);
        response.sendStatus(500);
      } else {
        // If user doesn't exist
        if (rows.length > 0) {
          // Password check
          bcrypt.compare(password, rows[0].password, function(err, result) {
            if (err) {
              console.error(err);
              response.sendStatus(500);
            } else if (result) {
              // Log user in
              util.createToken(req, res, rows[0].id);
            } else {
              // Password mismatch, unauthorized
              console.log("Password incorrect!");
              response.sendStatus(401);
            }
          });
        } else {
          // Email not found, unauthorized
          console.log("Unknown name!");
          response.sendStatus(401);
        }
      }
    });
  }
});

api.post('/groups', function(req, res){
  var name = req.body.group_name;
  if(name !== null){
    db.query('INSERT INTO GROUPS SET name = ?;',
    [name],
    function(err, result){
      if(err){
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

api.post('/tasks', function(req, res){
  var name = req.body.task_name;
  var description = req.body.description;
  var owner = req.body.owner;
  var date = req.body.due_date;
  if(name !== null && description !== null && owner !== null && date !== null){
    db.query('INSERT INTO TASKS SET name = ?, description = ?, owner = ?, date = ?;',
    [name, description, owner, date],
    function(err, result){
      if(err){
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }
    });
  } else {
    res.sendStatus(400);
  }
});


module.exports = api;
