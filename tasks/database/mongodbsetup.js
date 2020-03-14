const mongoDbSetup = `
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.NODE_ENV === "test"
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL

module.exports = mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
`;

module.exports = mongoDbSetup;
