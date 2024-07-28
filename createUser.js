const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Wiwehy34',
  database: 'medical_app'
});

db.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

const username = 'admin';
const password = 'admin123';
const role = 'admin';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;

  db.query(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hash, role],
    (error, results) => {
      if (error) throw error;
      console.log('User added successfully!');
      db.end();
    }
  );
});
