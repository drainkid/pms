const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
        origin.includes('localhost') ||
        origin.includes('vercel.app')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};


app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1', require('./src/routes/v1'));

app.get('/', (req, res) => {
  res.json({
    message: 'API сервер для модерации объявлений',
    version: '1.0.0'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Что-то пошло не так!',
    message: err.message
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint не найден',
    path: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

module.exports = app;
