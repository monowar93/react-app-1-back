const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/users.route');
const registerRouter = require('./routes/register.route');
const contactForm = require('./routes/contactForm.route');

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up routes
app.use('/users', userRouter);
app.use('/register', registerRouter);
app.use('/contact', contactForm);

// Serve static files from the views directory

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
