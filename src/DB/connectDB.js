require('dotenv').config();
const mongoose = require('mongoose');

const connectionURL = process.env.DB_CONNECTION_URL;

const connectDB = async () => {
  await mongoose.connect(connectionURL, { dbName: process.env.DB_NAME });
  console.log('Database connected...');
};

module.exports = connectDB;
