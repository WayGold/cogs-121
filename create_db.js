//create sqlite db
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('ezhelp.db');

db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE users (name TEXT, phone TEXT, location TEXT)");
  db.run("CREATE TABLE request_info (emergency TEXT, category TEXT, disability TEXT, description TEXT)")

  console.log('successfully created the request_info table in ezhelp.db');

  // print them out to confirm their contents:
  db.each("SELECT name, phone, location FROM request_info", (err, row) => {
      console.log(row.name + ": " + row.phone + ' - ' + row.location);
  });
});

db.close();
