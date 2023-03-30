require("dotenv").config();

// Server configuration
let PORT = process.env.PORT;
let NODE_ENV = process.env.NODE_ENV;

// Mailer configuration
let EMAIL_USERNAME = process.env.EMAIL_USERNAME;
let EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
let EMAIL_PORT = process.env.EMAIL_PORT;
let EMAIL_HOST = process.env.EMAIL_HOST;

// MongoDB configuration
let MONGODB_URI = process.env.MONGODB_URI;

// JWT secrets
let JWT_SECRET = process.env.JWT_SECRET;
let JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
let JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN;

// Google OAuth credentials
let CLIENT_ID = process.env.CLIENT_ID;

let SPREADSHEET_ID = process.env.SPREADSHEET_ID;
let ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

module.exports = {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN,
  EMAIL_USERNAME,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
  CLIENT_ID,
  SPREADSHEET_ID,
  ENCRYPTION_KEY,
};
