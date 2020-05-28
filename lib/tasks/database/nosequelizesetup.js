"use strict";const noSequelizeSetupData=`import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV;

const databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL

const pool = new Pool({
  connectionString: databaseUrl,
});

export default {
  query(text, params) {
    return new Promise(() => {
      pool.query(text, params);
    });
  },
};`;module.exports="import { Pool } from 'pg';\nimport dotenv from 'dotenv';\n\ndotenv.config();\n\nconst env = process.env.NODE_ENV;\n\nconst databaseUrl = env === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL\n\nconst pool = new Pool({\n  connectionString: databaseUrl,\n});\n\nexport default {\n  query(text, params) {\n    return new Promise(() => {\n      pool.query(text, params);\n    });\n  },\n};";