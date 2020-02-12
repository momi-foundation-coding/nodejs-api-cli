const noSequelizeSetupData = `import { Pool } from 'pg';
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
};`;

exports = module.exports = noSequelizeSetupData;
