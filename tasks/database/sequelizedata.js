/**
 * contains setting for setting sequelize for both
 * postgres or sqlite
 */

const sequelizeSetupData = database => {
  let newSequelizeInstance;
  let dbUrl;
  let requirePath;
  let closeSequelize;
  if (database.toLowerCase() === "sqlite") {
    /**
     * We could make use of memory database URI but data will be lost
     * when database is closed and also if memory is exhausted,
     * it will also be inefficient - > const sequelize = new Sequelize("sqlite::memory:");
     * this only can apply in future if there is need to use memory by user
     * or, this can be added to the documentation on how to make change.
     */
    requirePath = `import path from 'path';`;
    dbUrl = `
        process.env.NODE_ENV === "test"
        ? path.resolve(__dirname, "app.sqlite")
        : path.resolve(__dirname, "test.sqlite")
        `;
    newSequelizeInstance = `new Sequelize({
            dialect: 'sqlite',
            storage: dbUrl
        });`;
    closeSequelize = `sequelize.sync().done()`;
  } else if (database.toLowerCase() === "postgres") {
    dbUrl = `
        process.env.NODE_ENV === "test"
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL;
        `;
    newSequelizeInstance = `new Sequelize(dbUrl)`;
  }

  return `import Sequelize from 'sequelize';
    ${requirePath || ""}
    import dotenv from 'dotenv';

    dotenv.config();

    const dbUrl = ${dbUrl}

    const sequelize = ${newSequelizeInstance};

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    ${closeSequelize || ""}

    export default sequelize;
    `;
};

module.exports = sequelizeSetupData;
