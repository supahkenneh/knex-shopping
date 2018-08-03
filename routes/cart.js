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

router.post('/:user_id/:product_id', (req, res) => {
  const userId = req.params.user_id;
  const productId = req.params.product_id;

  db.raw('SELECT user_id, products_id FROM cart WHERE user_id = ? AND products_id = ?', [userId, productId])
  .then(result => {
    if (!result || !result.rowCount) {
      return res.status(404).json({ 'success' : 'failed' });
    }
    return result;
  })
  .then(result => {
    return db.raw('INSERT INTO cart (user_id, products_id) VALUES (? , ?)', [userId, productId])
  })
  .then(result => {
    res.json({'success' : 'true'})
  })
  .catch(err => console.log(err));
});

module.exports = router;