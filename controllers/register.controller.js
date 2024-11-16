const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
let registerSignInUser = require('../models/register.models');

//for getting All

exports.getRegister = (req, res) => {
  res.render('register/home.ejs', { activeRoute: 'home' });
};
exports.getSignIn = (req, res) => {
  const message = req.query.message || '';
  res.render('register/signIn', { activeRoute: 'signin', message });
};
exports.getLogIn = (req, res) => {
  const message = req.query.message || ''; //fk
  res.render('register/logIn.ejs', { activeRoute: 'login', message });
};
exports.getProfile = (req, res) => {
  res.render('register/profile.ejs', { activeRoute: 'profile' });
};
exports.getLogOut = (req, res) => {
  res.redirect('/register');
};

//for posting All

exports.postRegister = async (req, res) => {
  const {
    fullName,
    userName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    gender,
  } = req.body;
  console.log(req.body);

  if (password !== confirmPassword) {
    return res.redirect(
      `/register/signin?message=${encodeURIComponent(`Password Don't Match !`)}`
    ); //fk
  }

  try {
    const existingUser = await registerSignInUser.findOne({ userName });
    if (existingUser) {
      return res.redirect(
        `/register/signin?message=${encodeURIComponent(
          `Username already exists.Please Try another username!`
        )}`
      ); //fk
    }
    const existingEmail = await registerSignInUser.findOne({ email });
    if (existingEmail) {
      return res.redirect(
        `/register/signin?message=${encodeURIComponent(
          `Email already Registered.Please Try another Email !`
        )}`
      ); //fk
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new registerSignInUser({
      fullName: fullName,
      userName: userName,
      email: email,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      gender: gender,
    });

    await newUser.save();
    res.redirect(
      `/register/login?message=${encodeURIComponent(
        `Dear,  ${fullName} Sign-in successful. Please log in !!.`
      )}`
    ); //fk
    // res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    return res.redirect(
      `/register/signin?message=${encodeURIComponent(
        `Internal Server Error.Please try again later !`
      )}`
    ); //fk
  }
};

exports.postLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await registerSignInUser.findOne({ email: email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // Passwords do not match
      return res.status(400).send('Invalid email or password');
    }

    // Successful login: You can set a session or send a success response
    // Example using session (if session management is set up):
    // req.session.user = user;
    res.redirect('/register/profile'); // Redirect to the dashboard or home page
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
