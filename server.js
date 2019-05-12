//Server backend file

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

app.get('/users/:username', (req, res) => {
  const nameToLookup = req.params.username; // matches ':userid' above
  console.log("ID to look up:" + nameToLookup);
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all(
    'SELECT * FROM users WHERE username=$name',
    // parameters to SQL query:
    {
      $name: nameToLookup
    },
    // callback function to run when the query finishes:
    (err, rows) => {
      console.log("Length: " + rows.length + " value: ");
      console.log(rows);
      if (rows.length > 0) {
        console.log("Sending :");
        console.log(rows[0]);
        res.send(rows[0]);
      } else {
        res.send({}); // failed, so return an empty object instead of undefined
      }
    }
  );
});

app.get('/request_info', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT * FROM request_info', (err, rows) => {
    console.log(rows);
    res.send(rows);
  });
});

//post request for adding request to the db
app.post('/request_info', (req, res) => {
  console.log(req.body);

  db.run(
    'INSERT INTO request_info VALUES ($username, $emergency, $category, $disability, $description, $latitude, $longitude)',
    // parameters to SQL query:
    {
      $username: req.body.username,
      $emergency: req.body.emergency,
      $category: req.body.category,
      $disability: req.body.disability,
      $description: req.body.description,
      $latitude: req.body.latitude,
      $longitude: req.body.longitude,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        console.log("Fail inserting!")
        res.send({message: 'error in app.post(/request_info)'});
      } else {
        res.send({message: 'successfully run app.post(/request_info)'});
      }
    }
  );
});

app.post('/create_user', (req, res) => {
  console.log(req.body);

  db.run(
    'INSERT INTO users VALUES ($username, $name, $password, $phone, $location, $role)',
    // parameters to SQL query:
    {
      $username: req.body.username,
      $name: req.body.name,
      $password: req.body.password,
      $phone: req.body.phone,
      $location: req.body.location,
      $role: req.body.role,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        res.send('Fail');
      } else {
        res.send('Success');
      }
    }
  );
});

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
