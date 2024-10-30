let registrations = require('../models/registration.models');

exports.createRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const registrationUser = new registrations({
      name: name,
      email: email,
      password: password,
    });

    await registrationUser.save();
    res.status(201).json({
      message: `Dear ${name}, MongoDb successfully created your registration.`,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ error: 'Email already registered, please correct it fckkkk.' });
    }
    res.status(500).send(error.message); // General error handling
  }
};

//login post req

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await registrations.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Check if password matches (plain text comparison)
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Login successful
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

//get all users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await registrations.find(); // Retrieve all users from the database
    res.json(users); // Send users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error geting all users' });
  }
};
