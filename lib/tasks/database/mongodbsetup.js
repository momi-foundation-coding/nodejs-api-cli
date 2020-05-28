"use strict";const mongoDbSetup=`
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
`;module.exports="\nimport mongoose from 'mongoose';\nimport dotenv from 'dotenv';\n\ndotenv.config();\n\nconst dbUrl = process.env.NODE_ENV === \"test\"\n  ? process.env.TEST_DATABASE_URL\n  : process.env.DATABASE_URL\n\nmodule.exports = mongoose.connect(\n  dbUrl,\n  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }\n);\n";