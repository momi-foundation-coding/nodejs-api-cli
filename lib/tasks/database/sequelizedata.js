"use strict";/**
 * contains setting for setting sequelize for both
 * postgres or sqlite
 */const sequelizeSetupData=a=>{let b,c,d,e;return"sqlite"===a.toLowerCase()?(d=`import path from 'path';`,c=`process.env.NODE_ENV === "test"
        ? path.resolve(__dirname, "app.sqlite")
        : path.resolve(__dirname, "test.sqlite")`,b=`new Sequelize({
            dialect: 'sqlite',
            storage: dbUrl
        });`,e=`sequelize.sync().done()`):"postgres"===a.toLowerCase()&&(c=`process.env.NODE_ENV === "test"
        ? process.env.TEST_DATABASE_URL
        : process.env.DATABASE_URL;`,b=`new Sequelize(dbUrl)`),`import Sequelize from 'sequelize';
    ${d||""}
    import dotenv from 'dotenv';

    dotenv.config();

    const dbUrl = ${c}
    const sequelize = ${b};

    sequelize
      .authenticate()
      .then(() => {
          console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    ${e||""}

    export default sequelize;`};module.exports=sequelizeSetupData;