const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const port = process.env.PORT || 3000
const mongodb = process.env.MONGODB;

const app = express();

// Start the Server
app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});

// Connect to MongoDB
mongoose.connect(mongodb)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
