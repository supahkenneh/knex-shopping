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

module.exports = router;