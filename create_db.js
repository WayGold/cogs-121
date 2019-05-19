//create sqlite db
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ezhelp.db');

db.serialize(() => {
  // create a new database table: role -> 1:volunteer, 0:requester
  db.run("CREATE TABLE users (username TXT PRIMARY KEY, name TEXT, password TEXT, phone TEXT, location TEXT, role INT)");
  db.run("CREATE TABLE request_info (uid INTEGER PRIMARY KEY, requester TEXT, emergency TEXT, category TEXT, disability TEXT, description TEXT, latitude FLOAT, longitude FLOAT, accepter_latitude FLOAT, accepter_longitude FLOAT, status TEXT, accepter TEXT)");

  db.run("INSERT INTO users VALUES ('Gold', 'Wei', '123', '858-666-6666', '9500 Gilman Dr., La Jolla, CA', '1')");
  db.run("INSERT INTO users VALUES ('Ste', 'Stella', '123', '858-222-2222', '9500 Gilman Dr., La Jolla, CA', '1')");
  db.run("INSERT INTO users VALUES ('Joy', 'Joyce', '123', '858-888-8888', '9500 Gilman Dr., La Jolla, CA', '1')");
  db.run("INSERT INTO users VALUES ('Siyu', 'Siyu', '123', '858-999-9999', '9500 Gilman Dr., La Jolla, CA', '1')");
  db.run("INSERT INTO users VALUES ('George', 'Paul George', '123', '858-666-6666', '9500 Gilman Dr., La Jolla, CA', '0')");

  console.log('successfully created the users, request_info tables in ezhelp.db');

  // print them out to confirm their contents:
  console.log("In table users:");
  db.each("SELECT username, name, phone, location, role FROM users", (err, row) => {
    console.log(row.username + " -> " + row.name + ": " + row.phone + ' - ' + row.location + ' - ' + row.role);
  });
});

db.close();
