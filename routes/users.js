const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('you got users');
});

module.exports = router;