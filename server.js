/*
*  File Name: server.js
*
*  Functionalities:
*  1. Get requests including fetching all usernames, finding one specific users,
*     fetching all requests, finding the specific request with id, get filtered
*     requests with specified keys, rating infos with specified request id,
*     requests with specified key and value pairs.
*  2. Post request including creating a new request ticket and register for a
*     new user account.
*/

const express = require('express');
const url = require('url');
app = express();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ezhelp.db');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('static_files'));

// get request for all user info
app.get('/users', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT name FROM users', (err, rows) => {
    console.log(rows);
    const allUsernames = rows.map(e => e.name);
    console.log(allUsernames);
    res.send(allUsernames);
  });
});

// get request for user info by username
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

// get request for all the request info
app.get('/request_info', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT * FROM request_info', (err, rows) => {
    console.log(rows);
    res.send(rows);
  });
});

// get request for request info by uid
app.get('/request_info/:requestid', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  const requestToLookup = req.params.requestid;

  db.all('SELECT * FROM request_info WHERE uid=$uid',
  // parameters to SQL query:
  {
    $uid: requestToLookup
  },
  (err, rows) => {
    console.log(rows);
    res.send(rows);
  });
});

// get request for rating info by uid
app.get('/rating_info/:uid', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all('SELECT * FROM rating WHERE uid = $uid',
  {
    $uid: req.params.uid
  },
  (err, row) => {
    if (row.length > 0) {
      console.log("Rating found!" + row);
      res.send(row);
    }
    else {
      res.send({});
    }
  });
});

// get request for filtered request info
app.get('/filter', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  let emer_sql = "";
  let type_sql = "";
  let cate_sql = "";

  let params = url.parse(req.url, true).query;

  if(params.emergency!=""){
    emer_sql = ` AND emergency = "${params.emergency}"`
  }
  if(params.category!=""){
    cate_sql = ` AND category = "${params.category}"`
  }
  if(params.disability!=""){
    type_sql = ` AND disability = "${params.disability}"`
  }

  const sql = `SELECT * FROM request_info WHERE 1=1 ${emer_sql} ${cate_sql} ${type_sql}`;
  console.log(sql);

  db.all(sql,
    (err, row) => {
      console.log(row);
      res.send(row);
    },

  );
});

// get request for request info by specific property
app.get('/request_info/:property/:value', (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  const property = req.params.property;
  const value = req.params.value;
  const sql = 'SELECT * FROM request_info WHERE ' + property +" = $value";


  console.log(sql);
  db.all(sql,
    // parameters to SQL query:
    {
      $value: value
    },
    (err, rows) => {
      console.log(rows);
      res.send(rows);
    });
  });

//post request for adding request to the db
app.post('/request_info', (req, res) => {
  console.log(req.body);

  db.run(
    'INSERT INTO request_info VALUES ($uid, $requester, $emergency, $category, $disability, $description, $latitude, $longitude, $accepter_latitude, $accepter_longitude, $status, $accepter)',
    // parameters to SQL query:
    {
      $uid: null,
      $requester: req.body.requester,
      $emergency: req.body.emergency,
      $category: req.body.category,
      $disability: req.body.disability,
      $description: req.body.description,
      $latitude: req.body.latitude,
      $longitude: req.body.longitude,
      $accepter_latitude: null,
      $accepter_longitude: null,
      $status: req.body.status,
      $accepter: req.body.accepter,
    },
    // callback function to run when the query finishes:
    (err) => {
      if (err) {
        console.log("Fail inserting! " + err)
        res.send({message: 'error in app.post(/request_info)'});
      } else {
        res.send({message: 'successfully run app.post(/request_info)'});
      }
    }
  );
});

// post request for adding new user
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

// post requesting for adding new rating
app.post('/add_rating', (req, res) => {

  db.run(
    'INSERT INTO rating VALUES ($uid, $score, $description)',
    // parameters to SQL query:
    {
      $uid: req.body.uid,
      $score: req.body.score,
      $description: req.body.description,
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

// post request for adding new report
app.post('/add_report', (req, res) => {

  db.run(
    'INSERT INTO report VALUES ($uid, $description)',
    // parameters to SQL query:
    {
      $uid: req.body.uid,
      $description: req.body.description,
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

// post requesting for updating request status
app.post('/change_status/:uid', (req, res) => {
  console.log(req.body);

  db.run(
    'UPDATE request_info SET status = $status, accepter = $accepter WHERE uid = $uid',
    // parameters to SQL query:
    {
      $uid: req.params.uid,
      $status: req.body.status,
      $accepter: req.body.accepter
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

// post request for setting accepter's location
app.post('/set_accepter_location/:uid', (req, res) => {
  console.log(req.body);

  db.run(
    'UPDATE request_info SET accepter_latitude = $accepter_latitude, accepter_longitude = $accepter_longitude WHERE uid = $uid',
    // parameters to SQL query:
    {
      $uid: req.params.uid,
      $accepter_latitude: req.body.accepter_latitude,
      $accepter_longitude: req.body.accepter_longitude
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

// post request for deleting request by property
app.post('/delete/:property/:uid', (req, res) => {
  console.log(req.body);
  const property = req.params.property;
  const uid= req.params.uid;
  const sql = 'UPDATE request_info SET ' + property + ' = null WHERE uid = ' + uid;
  db.run(
    sql,
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

// post request for deleting request by uid
app.post('/delete/:uid', (req, res) => {
  console.log(req.body);

  db.run(
    'DELETE FROM request_info WHERE uid = $uid',
    // parameters to SQL query:
    {$uid: req.params.uid},
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

// server listener
app.listen(3000, () => {
  console.log('Server started at http://localhost:3000/');
});
