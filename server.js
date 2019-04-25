const express = require('express');
app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ezhelp.db');

app.use(express.static('static_files'));

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
