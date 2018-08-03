const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.get('/:user_id', (req, res) => {
  const id = req.params.user_id;
  db.raw('SELECT email FROM users WHERE id = ?', [id])
  .then(user => {
    if(!user || !user.rowCount) {
      res.status(400).send(`{ message: 'User not found'}`);
    }
    res.json(user.rows[0]);
  })
  .catch(err => console.log(err))
});

router.post('/login', (req, res) => {
  const data = req.body;
  db.raw('SELECT email, password FROM users WHERE email = ?', [data.email])
  .then(user => {
    if(!user || !user.rowCount) {
      return res.status(404).send(' { "message" : "User not found" }');
    }
    return user;
  })
  .then(user => {
    if(user.rows[0].password !== data.password) {
      return res.status(200).send(' { "message" : Incorrect password }');
    }
    return user;
  })
  .then(user => {
    res.send(user.rows);
  })
  .catch(err => console.log(err));
});

module.exports = router;