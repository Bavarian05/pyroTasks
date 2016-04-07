var express = require('express')
var api = express.Router()
var parser = require('body-parser')
var bcrypt = require('bcrypt-nodejs')
var util = require('./utilities')
var db = require('./db')

api.post('/signup', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  if(name !== null && email !== null && password !== null){
    db.query('SELECT * FROM USERS WHERE `email` = ?;', [email], function(err, rows){
      if(rows.length === 0){
        password = bcrypt.hashSync(password);
        db.query('INSERT INTO USERS SET `email` = ?, `name` = ?, `password` = ?;',
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
      db.query('SELECT * from USERS WHERE `name` = ?;', [name], function(err, rows) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        // If user doesn't exist
        if (rows.length > 0) {
          // Password check
          bcrypt.compare(password, rows[0].password, function(err, result) {
            if (err) {
              console.error(err);
              res.sendStatus(500);
            } else if (result) {
              // Log user in
              util.createToken(req, res, rows[0].id);
            } else {
              // Password mismatch, unauthorized
              console.log("Password incorrect!");
              res.sendStatus(401);
            }
          });
        } else {
          // Email not found, unauthorized
          console.log("Unknown name!");
          res.sendStatus(401);
        }
      }
    });
  }
});

api.post('/groups', util.checkToken, function(req, res){
  var name = req.body.group_name;
  if(name !== null){
    db.query('INSERT INTO GROUPS SET `name` = ?, `owner` = ?;',
    [name, req.user.id],
    function(err, result){
      if(err){
        console.error(err);
        res.sendStatus(500);
      } else {
        db.query('INSERT INTO MEMBERSHIPS SET `group` = ?, `user` = ?;',
        [result.insertId, req.user.id], function(err, result){
          if(err){
            console.error(err);
            // res.sendStatus(500);
          } else {
            console.log(result);
          }
        })
        res.sendStatus(201);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

api.get('/groups', util.checkToken, function(req, res){
  var user = req.user.id;
  db.query('SELECT GROUPS.id, GROUPS.name FROM MEMBERSHIPS INNER JOIN GROUPS ON MEMBERSHIPS.group = GROUPS.id WHERE MEMBERSHIPS.user = ?;',
  [user],
  function(err, rows){
    if(err){
      console.log(err);
      res.sendStatus(500)
    } else {
      res.json(rows);
    }
  })
});

api.put('/groups/:id', util.checkToken, function(req, res){
  var user = req.user.id;
  var group = Number(req.params.id);
  console.log(user, group);
  if(user && group){
    db.query('SELECT * FROM MEMBERSHIPS WHERE `user` = ? AND `group` = ?;',
    [user, group],
    function(err, rows){
      if(err){
        console.log('Bad select', err);
        res.sendStatus(500);
      } else if (rows.length === 0){
        db.query('INSERT INTO MEMBERSHIPS SET `user` = ?, `group` = ?;',
        [user, group],
        function(err, result){
          if(err){
            console.log('Bad insert', err);
            res.sendStatus(500);
          } else {
            res.sendStatus(201);
          }
        });
      } else {
        res.sendStatus(409);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

api.get('/group/:id', util.checkToken, function(req, res){
  db.query('SELECT `id`, `name` FROM TASKS WHERE `group` = ?;', [req.params.id], function(err, rows){
    if(err){
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(rows);
    }
  });
});

api.post('/group/:id', util.checkToken, function(req, res){
  var name = req.body.task_name;
  var description = req.body.description;
  var date = req.body.due_date;
  if(name !== null && description !== null && date !== null){
    db.query('INSERT INTO TASKS SET `name` = ?, `description` = ?, `owner` = ?, `due_date` = ?, `group` = ?;',
    [name, description, req.user.id, date, req.params.id],
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

api.get('/task/:id', util.checkToken, function(req, res){
  db.query('SELECT `id`, `name` FROM TASKS WHERE `id` = ?;', [req.params.id], function(err, rows){
    if(err){
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log('rows');
      res.json(rows[0]);
    }
  });
});




module.exports = api;
