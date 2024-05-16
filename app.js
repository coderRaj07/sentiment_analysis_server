const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const sentimentRoutes = require('./routes/sentimentRoutes');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();
require('./config/passport')(passport);

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sentiment', sentimentRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
