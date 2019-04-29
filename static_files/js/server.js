//Server backend file

const express = require('express');
app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ezhelp.db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static('../static_files/html'));

app.get('/users', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT name FROM users', (err, rows) => {
    console.log(rows);
    const allUsernames = rows.map(e => e.name);
    console.log(allUsernames);
    res.send(allUsernames);
  });
});

app.get('/request_info', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT * FROM request_info', (err, rows) => {
    console.log(rows);
    res.send(rows);
  });
});

app.post('/request_info', (req, res) => {
  console.log(req.body);

  db.run(
    'INSERT INTO request_info VALUES ($userid, $emergency, $category, $disability, $description)',
    // parameters to SQL query:
    {
      $userid: req.body.userid,
      $emergency: req.body.emergency,
      $category: req.body.category,
      $disability: req.body.disability,
      $description: req.body.description,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send({message: 'error in app.post(/request_info)'});
      } else {
        res.send({message: 'successfully run app.post(/request_info)'});
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
