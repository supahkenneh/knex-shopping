const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
const PORT = process.env.port || 3000;
const cart = require('./routes/cart');
const products = require('./routes/products');
const users = require('./routes/users');

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/cart', cart);
app.use('/products', products);
app.use('/users', users);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => console.log(`Connected to server on port: ${PORT}`));

