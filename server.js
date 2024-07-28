const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const secretKey = 'your_secret_key';

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

app.use(bodyParser.json());
app.use(cors());

// Endpoint pentru autentificare
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid username or password' });
      }
      const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
      res.send({ token });
    });
  });
});

// Middleware pentru protejarea resurselor
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  });
};

// Endpoint pentru a obține toate întrebările de biologie
app.get('/api/biology-questions', authMiddleware, (req, res) => {
  db.query('SELECT * FROM biology_questions', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Endpoint pentru a obține toate întrebările de chimie
app.get('/api/chemistry-questions', authMiddleware, (req, res) => {
  db.query('SELECT * FROM chemistry_questions', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Endpoint pentru a adăuga o întrebare de biologie
app.post('/api/biology-questions', authMiddleware, (req, res) => {
  const { question_text, answer_a, answer_b, answer_c, answer_d, answer_e, correct_answer } = req.body;
  db.query(
    'INSERT INTO biology_questions (question_text, answer_a, answer_b, answer_c, answer_d, answer_e, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [question_text, answer_a, answer_b, answer_c, answer_d, answer_e, correct_answer],
    (error, results) => {
      if (error) throw error;
      res.send({ message: 'Biology question added successfully!' });
    }
  );
});

// Exemplu de rută protejată
app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).send({ message: 'This is a protected route' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
