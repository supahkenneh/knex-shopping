const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.get('/', (req, res) => {
  db.raw('SELECT * FROM products')
    .then(result => {
      if (!result.rows) {
        res.status(404).json({ 'message': 'There are no products' })
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
        return res.status(404).json({ 'Message': "Product not found" })
      }
      return result;
    })
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => console.log(err));
});

router.post('/new', (req, res) => {
  const data = req.body;
  if (!data.title || !data.description || !data.inventory || !data.price) {
    return res.status(400).json({ 'message': "Must fill all product fields" });
  } else {
    return db.raw('INSERT INTO products (title, description, inventory, price) VALUES (?, ?, ?, ?) RETURNING *', [data.title, data.description, data.inventory, data.price])
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => console.log(err));
  }
});

router.put('/:product_id', (req, res) => {
  const id = req.params.product_id;
  const data = req.body;
  db.raw('SELECT title, description, inventory, price FROM products WHERE id = ?', [id])
  .then(result => {
    if (!result || !result.rowCount) {
      return res.status(404).json({'message' : 'Item does not exist!'})
    }
    return result;
  })
  .then(result => {
    return db.raw('UPDATE products SET title = ?, description = ?, inventory = ?, price = ? WHERE id = ? RETURNING *', [data.title, data.description, data.inventory, data.price, id])
  })
  .then(result => {
    return res.json(result.rows[0]);
  })
  .catch(err => console.log(err));
});

module.exports = router;