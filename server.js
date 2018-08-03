const express = require('express');
const app =  express();
const PORT = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => console.log('Connected to server'));

