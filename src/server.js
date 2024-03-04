const express = require('express');
const app = express();
const { Pool } = require('pg');


const cors = require('cors');
app.use(cors());

app.use(express.json());

// Настройки подключения к базе данных PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'evalUIX_db',
  password: 'admin',
  port: 4321 // Порт по умолчанию для PostgreSQL
});

// Маршрут для получения данных из таблицы "expert"
app.get('/api/expert', (req, res) => {
  pool.query('SELECT * FROM expert', (err, result) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Error executing query' });
    } else {
      res.json(result.rows);
    }
  });
});


// Middleware для разрешения CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // URL Angular приложения
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Маршрут для регистрации пользователя
app.post('/api/register', (req, res) => {
  const { username, email, password, weight, category } = req.body;

  // Выполнение запроса к базе данных для регистрации пользователя
  pool.query('INSERT INTO expert (username, email, password, weight, category) VALUES ($1, $2, $3, $4, $5)', [username, email, password, weight, category], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

// Роут для авторизации пользователя
app.post('/api/auth', (req, res) => {
  const { email, password } = req.body;

  // Выполнение запроса к базе данных для проверки учетных данных пользователя
  pool.query('SELECT * FROM expert WHERE email = $1 AND password = $2', [email, password], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.rows.length > 0) {
      const user = results.rows[0];
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: 'Такого пользователя не существует' });
    }
  });
});

//обновление данных пользователя
app.put('/api/expert/:id', (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;

  const query = 'UPDATE expert SET username = $1, email = $2, password = $3 WHERE id = $4';
  const values = [username, email, password, id];

  pool.query(query, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update data' });
    } else {
      res.json({ message: 'Data updated successfully' });
    }
  });
});


// Маршрут для получения данных из таблицы evaluation_request
app.get('/api/evaluation_request/get-request-by-category', (req, res) => {
  const { category } = req.query;
  const query = 'SELECT * FROM evaluation_request WHERE category = $1';
  const values = [category];

  pool.query(query, values)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Маршрут для отправки оценки эксперта
app.post('/api/evaluation', (req, res) => {
  const {
    expertWeight,
    expertId,
    evaluationId,
    indicator_1,
    indicator_2,
    indicator_3,
    indicator_4,
    indicator_5,
    indicator_6,
    indicator_7,
    indicator_8,
    indicator_9,
    indicator_10,
    indicator_11,
    indicator_12,
    indicator_13,
    indicator_14,
    indicator_15,
    indicator_16,
  } = req.body;

  // Выполнение запроса к базе данных для вставки результатов оценки
  pool.query('INSERT INTO evaluation (expert_weight, expert_id, evaluation_id, indicator_1, indicator_2, indicator_3, indicator_4, indicator_5, indicator_6, indicator_7, indicator_8, indicator_9, indicator_10, indicator_11, indicator_12, indicator_13, indicator_14, indicator_15, indicator_16) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)', [expertWeight, expertId, evaluationId, indicator_1, indicator_2, indicator_3, indicator_4, indicator_5, indicator_6, indicator_7, indicator_8, indicator_9, indicator_10, indicator_11, indicator_12, indicator_13, indicator_14, indicator_15, indicator_16], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Evaluation passed successfully' });
    }
  });
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
