const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'))
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Something is happening on ${port}`));

module.exports = app;
