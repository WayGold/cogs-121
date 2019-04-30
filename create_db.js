//create sqlite db
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ezhelp.db');

db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users (userid INT PRIMARY KEY, name TEXT, password TEXT, phone TEXT, location TEXT)");
  db.run("CREATE TABLE request_info (userid INT, emergency TEXT, category TEXT, disability TEXT, description TEXT)");

  db.run("INSERT INTO users VALUES (0, 'Wei', '123', '858-666-6666', '9500 Gilman Dr., La Jolla, CA')");
  db.run("INSERT INTO users VALUES (1, 'Stella', '123', '858-222-2222', '9500 Gilman Dr., La Jolla, CA')");
  db.run("INSERT INTO users VALUES (2, 'Joyce', '123', '858-888-8888', '9500 Gilman Dr., La Jolla, CA')");
  db.run("INSERT INTO users VALUES (3, 'Siyu', '123', '858-999-9999', '9500 Gilman Dr., La Jolla, CA')");

  console.log('successfully created the users, request_info tables in ezhelp.db');

  // print them out to confirm their contents:
  console.log("In table users:");
  db.each("SELECT userid, name, phone, location FROM users", (err, row) => {
    console.log(row.userid + " -> " + row.name + ": " + row.phone + ' - ' + row.location);
  });
});

db.close();
