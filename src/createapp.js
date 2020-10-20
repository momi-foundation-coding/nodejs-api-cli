#!/usr/bin/env node

/**
 * Nodejs internal modules
 */

/**
 * External dependancies installed through npm
 */
const { version } = require("../package.json");
/**
 * Internal imports goes here
 */
const { chooseConsoleColorText } = require("./utils/consolecolors");
const colorSet = require("./utils/colorsets");
const installingDependancies = require("./installingdependancies");
const createMainDir = require("./createmaindir");
const createRouteDirFiles = require("./createroutedirfile");
const {
  promptAppName,
  promptFrameworkDb,
  promptOrm,
  promptTest,
  promptTestRunner,
} = require("./utils/inquirer");

// Creating the main application
const createApp = async (details) => {
  const {
    appName,
    framework,
    database,
    orm,
    tests,
    testFramework,
    expectationLibrary,
  } = details;
  await createMainDir({ appName, tests, orm, database });
  await createRouteDirFiles(appName, database);
  await installingDependancies({
    appName,
    framework,
    database,
    orm,
    testFramework,
    expectationLibrary,
  });
};

// log message/errors in console
const loggingMessage = (consoleColorSet, message) => {
  chooseConsoleColorText(
    consoleColorSet,
    message
  );
}
// when we need to log more than 1 message in console
const logMoreThanOneMsg = (arr) => {
  if(Array.isArray(arr)) {
    arr.forEach(msg => {
      chooseConsoleColorText(
        msg.consoleColorSet,
        msg.message
      );
    })
  }
}

// Remove the first 2 arguments
const args = process.argv.slice(2);

if(args.length <= 0) {
  let message = "------\nValue is required  e.g nodejs-api-cli init--------\n";

  if(process.env.NODE_ENV === "development") {
    message = "------\nValue is required  e.g npm run start:dev init--------\n";
  }
  chooseConsoleColorText(
    colorSet.error,
    message
  );
  process.exit(0);
}

// Convert into a module that can be used as CLI
// eslint-disable-next-line consistent-return
args.forEach(async (value) => {
  /**
   * Can this be tested?
   * E.g ensure that an application is created
   */
  let message = "\n------Value entered is wrong. Use -- e.g nodejs-api-cli -h --------\n";
  let consoleColorSet = colorSet.error;
  
  if (value === "version" || value === "-v") {
    message = version
    consoleColorSet = colorSet.normal
  }

  if(value ===  "help" || value === "-h") {
    let helpMsgs = [
      {
        consoleColorSet: colorSet.log,
        message: "New Project: nodejs-api-cli init\n"
      },
      {
        consoleColorSet: colorSet.log,
        message: "Help: nodejs-api-cli help or nodejs-api-cli help\n"
      },
      {
        consoleColorSet: colorSet.log,
        message:  "Version: nodejs-api-cli version or nodejs-api-cli -v\n"
      },
      {
        consoleColorSet: colorSet.log,
        message:  "Documentation: https://kemboijs.github.io/kemboijs.org/\n"
      }
    ]
    return logMoreThanOneMsg(helpMsgs);
  }

  if(value === "init") {
    const appName = await promptAppName();
    const collectFrameworkAndDb = await promptFrameworkDb();
    const { database } = collectFrameworkAndDb;
    const ormChoices = [];
    /**
     * Select the ORMs options based on the database provided above.
     */
    if (database === "Postgres") {
      ormChoices.push("Sequelize", "No ORM");
    } 
    if (database === "Sqlite") {
      // sqlite to be installed is version 3
      ormChoices.push("Sequelize");
    } 
    if (database === "MongoDB") {
      ormChoices.push("mongoose");
    }

    const collectOrm = await promptOrm(ormChoices);
    const needTests = await promptTest();
    let testRunner;
    const { tests } = needTests;
    let requiredItems = {
      ...appName,
      ...collectFrameworkAndDb,
      ...collectOrm,
      tests
    }
    if(!tests) {
      return createApp(requiredItems);
    }

    if(tests) {
      let appDetails = {};
      testRunner = await promptTestRunner();
      appDetails = { ...requiredItems, ...testRunner };
      return createApp(appDetails);
    }
  }

  // log message 
  loggingMessage(consoleColorSet, message);
});
