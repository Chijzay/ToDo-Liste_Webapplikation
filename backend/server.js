require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Auth-Routen
app.use('/api/auth', authRoutes);

// Todo-Routen (mit Auth-Middleware in der Route selbst)
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
