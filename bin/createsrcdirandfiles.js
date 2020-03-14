/**
 * creating src directories and files
 * @param {*} details
 */
const fs = require("fs");

const openAppendFile = require("./openandappendfile");
const {
  controllers,
  userController,
  services,
  userService,
  userServiceMongo,
  userModelData,
  noSequelizeSetupData,
  sequelizeSetupData,
  middlewares,
  userMiddleware,
  noSequelizeUserModelData,
  routes,
  userRouter,
  routeTest,
  middlewareTest,
  useControllerTest,
  createDb,
  dropDb,
  noOrmcreateDb,
  noOrmDropDb,
  userQueries,
  appJs,
  noOrmUserController,
  mongoDbSetup,
  mongoDbUserModelData,
  mongoDbController,
  responseHelper
} = require("../tasks");

const createSrcDirAndFiles = details => {
  const { appBaseDirectory, tests, database, orm } = details;
  const foldersToAdd = [
    "src/controllers",
    "src/services",
    "src/routes",
    "src/config",
    "src/scripts",
    "src/models",
    "src/middlewares",
    "src",
    "src/helpers"
  ];
  if (tests) {
    foldersToAdd.push(
      "tests/controllers",
      "tests/middlewares",
      "tests/routes",
      "tests"
    );
  }

  const folders = foldersToAdd
    // will need to recheck here
    .filter(folder => folder || folder !== undefined)
    .map(folder => `${appBaseDirectory}/${folder}`);

  folders.forEach(folder => {
    fs.mkdir(folder, { recursive: true }, err => {
      if (err) throw err;
      // Check created files and createstream of the files
      const mainFiles = `${folder}/index.js`;
      const fileName = fs.createWriteStream(mainFiles);

      // Scripts file, which include running migrations and dropping db
      const scriptsArr = [`${appBaseDirectory}/src/scripts`];

      if (scriptsArr.includes(folder)) {
        // Create a script to create tables
        const createDbFile = `${appBaseDirectory}/src/scripts/createdb.js`;
        const createDbFileName = fs.createWriteStream(createDbFile);
        // Create a script to drop tables
        const dropDbFile = `${appBaseDirectory}/src/scripts/dropdb.js`;
        const dropDbFileName = fs.createWriteStream(dropDbFile);
        let createDbData;
        let dropDbData;
        if (orm && orm.toLowerCase() === "sequelize") {
          createDbData = createDb;
          dropDbData = dropDb;
        } else if (orm && orm.toLowerCase() === "no orm") {
          // When user does't need any orm
          createDbData = noOrmcreateDb;
          dropDbData = noOrmDropDb;
          // Create a script to query database -> only when no orm
          const queriesFile = `${appBaseDirectory}/src/scripts/queries.js`;
          const queriesFileName = fs.createWriteStream(queriesFile);
          openAppendFile(queriesFileName.path, userQueries);
        }
        // append drop database scripts and create db scripts
        openAppendFile(createDbFileName.path, createDbData);
        openAppendFile(dropDbFileName.path, dropDbData);
      }

      // Write sequelize instance and create models here
      const modelArrs = [`${appBaseDirectory}/src/models`];

      if (modelArrs.includes(folder)) {
        // Set up for sequelize database
        const sequelizeSetupFile = `${appBaseDirectory}/src/models/setup.js`;
        const sequelizeSetupFileName = fs.createWriteStream(sequelizeSetupFile);
        const pathName = sequelizeSetupFileName.path;
        const userModels = `${appBaseDirectory}/src/models/user.js`;
        const userModelsFileName = fs.createWriteStream(userModels);
        if (orm) {
          if (orm.toLowerCase() === "sequelize") {
            /**
             * set up data in sequelize here
             */
            openAppendFile(pathName, sequelizeSetupData(database));
            // add data to user.js models file when sequelize is set
            openAppendFile(userModelsFileName.path, userModelData(database));
          } else if (
            orm.toLowerCase() === "no orm" &&
            database.toLowerCase() === "postgres"
          ) {
            /**
             * In case sqlite set in the future so that it does'nt make use of orm
             * then, we can have another if statement for the same here
             */
            openAppendFile(pathName, noSequelizeSetupData);
            // Add data to user.js file when no orm is chosen in models
            openAppendFile(userModelsFileName.path, noSequelizeUserModelData);
          } else if (orm && orm.toLowerCase() === "mongoose") {
            openAppendFile(pathName, mongoDbSetup);
            openAppendFile(userModelsFileName.path, mongoDbUserModelData);
          }
        }
      }

      // Write to tests files
      const testsArr = [
        `${appBaseDirectory}/tests/controllers`,
        `${appBaseDirectory}/tests/middlewares`,
        `${appBaseDirectory}/tests/routes`
      ];

      if (testsArr.includes(folder)) {
        switch (folder) {
          case `${appBaseDirectory}/tests/controllers`:
            {
              // Create a tests script for user controllers
              const userControllerFile = `${folder}/user.js`;
              const userControllerFileName = fs.createWriteStream(
                userControllerFile
              );
              openAppendFile(userControllerFileName.path, useControllerTest);
            }
            break;

          case `${appBaseDirectory}/tests/middlewares`:
            {
              // Create a tests script for middlewares
              const middlewareFile = `${folder}/index.js`;
              const middlewareFileName = fs.createWriteStream(middlewareFile);
              openAppendFile(middlewareFileName.path, middlewareTest);
            }
            break;

          default:
            {
              // Create a tests script for routes
              const routeFile = `${folder}/index.js`;
              const routeFileName = fs.createWriteStream(routeFile);
              openAppendFile(routeFileName.path, routeTest);
            }
            break;
        }
      }

      // Add data to the main entry point
      if (fileName.path === `${appBaseDirectory}/src/index.js`) {
        const pathName = fileName.path;
        openAppendFile(pathName, appJs);
      }

      // Paths that needs files such as user.js, config may not need it.
      const pathsThatNeedBaseFiles = [
        `${appBaseDirectory}/src/middlewares`,
        `${appBaseDirectory}/src/routes`,
        `${appBaseDirectory}/src/controllers`,
        `${appBaseDirectory}/src/services`
      ];
      // Now create file user.js in specified directories
      if (pathsThatNeedBaseFiles.includes(folder)) {
        /**
         * In the base directories create user.js file
         * [For middlewares, routes, controllers]
         */
        const directoryFiles = `${folder}/user.js`;
        const directoryFileName = fs.createWriteStream(directoryFiles);
        if (
          directoryFileName.path ===
          `${appBaseDirectory}/src/middlewares/user.js`
        ) {
          openAppendFile(directoryFileName.path, userMiddleware);
        }
        if (
          directoryFileName.path === `${appBaseDirectory}/src/routes/user.js`
        ) {
          openAppendFile(directoryFileName.path, userRouter);
        } if (directoryFileName.path === `${appBaseDirectory}/src/services/user.js`) {
          if (database.toLowerCase() === 'postgres') {
            openAppendFile(directoryFileName.path, userService)
          } else if (database.toLowerCase() === 'mongodb') {
            openAppendFile(directoryFileName.path, userServiceMongo)
          }
        }
        if (
          directoryFileName.path ===
          `${appBaseDirectory}/src/controllers/user.js`
        ) {
          if (orm === "No ORM") {
            openAppendFile(directoryFileName.path, noOrmUserController);
          } else if (orm === "mongoose") {
            openAppendFile(directoryFileName.path, mongoDbController);
          } else {
            openAppendFile(directoryFileName.path, userController);
          }
        }
      }

      // Write to different files including the index.js and other files
      if (fileName.path === `${appBaseDirectory}/src/middlewares/index.js`) {
        openAppendFile(fileName.path, middlewares);
      }
      if (fileName.path === `${appBaseDirectory}/src/routes/index.js`) {
        openAppendFile(fileName.path, routes);
      }
      if (fileName.path === `${appBaseDirectory}/src/controllers/index.js`) {
        openAppendFile(fileName.path, controllers);
      } if (fileName.path === `${appBaseDirectory}/src/services/index.js`) {
        openAppendFile(fileName.path, services);
      }
      if (fileName.path === `${appBaseDirectory}/src/models/index.js`) {
        openAppendFile(
          fileName.path,
          `export { default as User } from './user';`
        );
      }
      const helperArr = [`${appBaseDirectory}/src/helpers`];
      if (helperArr.includes(folder)) {
        // Create a response helpers file
        const responseHandlerFile = `${appBaseDirectory}/src/helpers/responsehandler.js`;
        const responseHandlerFileName = fs.createWriteStream(
          responseHandlerFile
        );
        openAppendFile(responseHandlerFileName.path, responseHelper);
      }
    });
  });
};

module.exports = createSrcDirAndFiles;
