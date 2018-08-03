const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.get('/:user_id', (req, res) => {
  const id = req.params.user_id;
  db.raw('SELECT email, password FROM users WHERE id = ?', [id])
    .then(user => {
      if (!user || !user.rowCount) {
        res.status(400).json({ 'message': 'User not found'});
      }
      res.json(user.rows[0]);
    })
    .catch(err => console.log(err))
});

router.post('/login', (req, res) => {
  const data = req.body;
  db.raw('SELECT email, password FROM users WHERE email = ?', [data.email])
    .then(user => {
      if (!user || !user.rowCount) {
        return res.status(404).json({ "message": "User not found" });
      }
      return user;
    })
    .then(user => {
      if (user.rows[0].password !== data.password) {
        return res.status(200).json({ "message": "Incorrect password" });
      }
      return user;
    })
    .then(user => {
      res.json(user.rows[0]);
    })
    .catch(err => console.log(err));
});

router.post('/register', (req, res) => {
  const data = req.body;
  db.raw('SELECT email FROM users WHERE email = ?', [data.email])
    .then(result => {
      if (result.rows[0].email === data.email) {
        return res.status(400).json({ "message" : "User already exists" });
      }
      return result;
    })
    .then(result => {
      return db.raw('INSERT INTO users (email, password) VALUES (? , ?) RETURNING *', [data.email, data.password])
    })
    .then(newUser => {
      return res.json(newUser.rows[0]);
    })
    .catch(err => console.log(err));
});

router.put('/:user_id/forgot-password', (req, res) => {
  const id = req.params.user_id;
  const pass = req.body.password;
  db.raw('SELECT password FROM users WHERE id = ?', [id])
    .then(result => {
      if (!result || !result.rowCount) {
        return res.status(404).send('User not found');
      }
      return result;
    })
    .then(result => {
      return db.raw(`UPDATE users SET password = ? WHERE id = ? RETURNING *`, [pass, id])
    })
    .then(result => {
      return res.json({ "message": "New password created!" });
    })
    .catch(err => console.log(err));
});

router.delete('/:user_id', (req, res) => {
  const id = req.params.user_id;
  db.raw('SELECT id, email FROM users WHERE id = ?', [id])
    .then(user => {
      if (!user || !user.rowCount) {
        return res.status(404).send('{ "message": "User ID not found" }');
      }
      return user;
    })
    .then(user => {
      return db.raw('DELETE FROM users WHERE id = ? RETURNING *', [id]);
    })
    .then(user => {
      return res.json({ "message": `User ID: ${id} successfully deleted` })
    })
    .catch(err => console.log(err));
});

module.exports = router;