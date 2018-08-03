const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.get('/', (req, res) => {
  db.raw('SELECT * FROM products')
  .then(result => {
    if(!result.rows) {
      res.status(404).json({'message': 'There are no products'})
    }
    return result;
  })
  .then(result => {
    res.json(result.rows);
  })
  .catch(err => console.log(err));
});

router.get('/:product_id', (req, res) => {
  const id = req.params.product_id;
  db.raw('SELECT * FROM products WHERE id = ?', [id])
  .then(result => {
    if (!result || !result.rowCount) {
      return res.status(404).json({'Message': "Product not found"})
    }
    return result;
  })
  .then(result => {
    res.json(result.rows[0]);
  })
  .catch(err => console.log(err));
})

module.exports = router;