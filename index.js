/*const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'mina',
  password: '12345',
  database: 'mina_cli',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Route to handle POST requests to add data
app.post('/api/data', async (req, res) => {
  const { name, description } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO data (name, description) VALUES (?, ?)',
      [name, description]
    );
    connection.release();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

// Route to handle GET requests to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM data');
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching dataa' });
  }
});

// Route to handle GET requests to the root endpoint
app.get('/', (req, res) => {
  res.send('Hello, Welcome to my backend server hihi!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

/*const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'mina',
  password: '12345',
  database: 'mina_cli',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/api/data', async (req, res) => {
  const { name, description } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO data (name, description) VALUES (?, ?)',
      [name, description]
    );
    connection.release();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM data');
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Welcome to my backend server hihi!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'minaa',
  password: 'Mina123',
  database: 'mina_ecr',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO data (name, description) VALUES (?, ?)',
      [name, description]
    );
    connection.release();
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting dataa' });
  }
});

app.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM data');
    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching dataa' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Welcome to my backend server hihi!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


