const path = require('path');
let user = require('../models/users.models');

//users GET ALLLL........

exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users); // Send users as JSON response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' }); // Send error response
  }
};
exports.getOneUser = async (req, res) => {
  try {
    const userName = req.params.name;
    const users = await user.find({ name: userName });
    res.status(200).json(users); // Send users as JSON response
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'mongodb error' }); // Send error response
  }
};

//users POST
exports.createUsers = async (req, res) => {
  const { name, age } = req.body;
  console.log(req.body);
  try {
    const newUser = new user({ name: name, age: age });

    await newUser.save();
    res
      .status(201)
      .send(`Dear ${name}, MongoDb successfully Created your name and age`);
  } catch (error) {
    res.status(501).send(error.message);
  }
};

//users PUT
exports.updateUsers = async (req, res) => {
  const userName = req.params.name; // Get the name from the URL parameters
  const { name, age } = req.body; // Get new name and age from the request body

  try {
    // Find the user by name
    const findUser = await user.findOne({ name: userName });

    // Check if user exists
    if (!findUser) {
      return res.status(404).send({ message: `User "${userName}" not found.` });
    }

    // Update user details
    findUser.name = name; // Update the name
    findUser.age = age; // Update the age
    await findUser.save(); // Save the updated user back to the database

    // Respond with the updated user
    res.status(200).send(findUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};

// user DELETE

exports.deleteUsers = async (req, res) => {
  const userName = req.params.name;

  try {
    const deletedUser = await user.findOneAndDelete({ name: userName });

    if (!deletedUser) {
      return res.status(404).send({ message: `User "${userName}" not found.` });
    }

    res
      .status(200)
      .send({ message: `User "${userName}" deleted successfully.` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
};
