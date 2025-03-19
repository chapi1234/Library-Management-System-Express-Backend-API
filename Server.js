const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();
const port = process.env.PORT || 3000
const mongodb = process.env.MONGODB;

const app = express();

// Import the  routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const librarianRoutes = require('./routes/librarian');
const adminRoutes = require('./routes/admin')
const bookRoutes = require('./routes/book');
const borrowBookRoutes = require('./routes/borrowBook');
const reviewRoutes = require('./routes/review')


// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors()); 

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/librarian', librarianRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/book', bookRoutes);
app.use('/api/borrow', borrowBookRoutes); 
app.use('/api/review', reviewRoutes)

// Start the Server
app.listen(port, () => { 
  console.log(`Server is running on port ${port}`);
});

// Connect to MongoDB
mongoose.connect(mongodb)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
