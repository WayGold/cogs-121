const express = require('express');
app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ezhelp.db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('static_files'));

app.get('/users', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT name FROM users', (err, rows) => {
    console.log(rows);
    const allUsernames = rows.map(e => e.name);
    console.log(allUsernames);
    res.send(allUsernames);
  });
});


app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
