const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.get('/:user_id', (req, res) => {
  const id = req.params.user_id;
  db.raw('SELECT products.* FROM cart JOIN products ON (cart.products_id = products.id) JOIN users ON (cart.user_id = users.id) WHERE user_id = ?', [id])
  .then(result => {
    if (!result || !result.rowCount) {
      return res.status(404).json({'message':'no products from this user'});
    }
    return result;
  })
  .then(result => {
    res.json(result.rows);
  })
  .catch(err => console.log(err));
});

module.exports = router;