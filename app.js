const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const userRouter = require('./routes/users.route');
const registerRouter = require('./routes/register.route');
const contactForm = require('./routes/contactForm.route');
const registrationRoute = require('./routes/registration.route');
const ejsRoute = require('./routes/ejs.route');
const connectDB = require('./config/db');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

// Enable CORS for all routes
// const corsOptions = {
//   origin: 'http://localhost:3000', // Frontend URL (React app)
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// };
app.use(cors());

// Connect to MongoDB
connectDB();

// Setting up routes
app.use('/contact', contactForm);
app.use('/users', userRouter);
app.use('/register', registerRouter);
app.use('/api/registration', registrationRoute);
app.use('/api/ejs', ejsRoute);

// Home route
app.get('/', (req, res) => {
  res.send('I am getting data from home');
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(400).send('Bad Request tarek');
});

// Export the app for use in other files
module.exports = app;
