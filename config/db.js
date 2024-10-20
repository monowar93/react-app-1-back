const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Mongo DB Connected Successfully');
  } catch (error) {
    console.error('Failled to Connect Mongo DB', error.message);
  }
};

module.exports = connectDB;
