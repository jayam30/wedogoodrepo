
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const reportRoutes = require('./routes/report');

dotenv.config();

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/', reportRoutes);


app.use((req, res, next) => {
  console.log(`📩 Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error('🔥 Global error handler:', err.stack);
  res.status(500).json({ message: 'Internal server error (global)', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
