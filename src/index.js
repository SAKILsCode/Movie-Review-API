/**
 * Title: Index file
 * Description: Application entry point, application will start from this file.
 */

// Dependencies
require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./DB/connectDB');

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

// Main function
const main = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is listening on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log('Database Error');
    console.log(error)
  }
};

// Invoke main function
main();
