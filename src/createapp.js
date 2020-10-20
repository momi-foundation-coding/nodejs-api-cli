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
  if (!value) {
    chooseConsoleColorText(
      colorSet.error,
      "------\nValue is required  e.g nodejs-api-cli init--------\n"
    );
    process.exit(0);
  } else if (value === "version" || value === "-v") {
    chooseConsoleColorText(colorSet.normal, version);
  } else if (value === "help" || value === "-h") {
    chooseConsoleColorText(
      colorSet.normal,
      "New Project: nodejs-api-cli init\n"
    );
    chooseConsoleColorText(
      colorSet.normal,
      "Help: nodejs-api-cli help or nodejs-api-cli -h\n"
    );
    chooseConsoleColorText(
      colorSet.normal,
      "Version: nodejs-api-cli version or nodejs-api-cli -v\n"
    );
    chooseConsoleColorText(
      colorSet.normal,
      "Documentation: https://kemboijs.github.io/kemboijs.org/\n"
    );
  } else if (value === "init") {
    const appName = await promptAppName();
    const collectFrameworkAndDb = await promptFrameworkDb();
    const { database } = collectFrameworkAndDb;
    const ormChoices = [];

    /**
     * Select the ORMs options based on the database provided above.
     */
    if (database === "Postgres") {
      ormChoices.push("Sequelize", "No ORM");
    } else if (database === "Sqlite") {
      // sqlite to be installed is version 3
      ormChoices.push("Sequelize");
    } else if (database === "MongoDB") {
      ormChoices.push("mongoose");
    } else {
      chooseConsoleColorText(
        colorSet.error,
        "\n------Error occurred while collecting database details------\n"
      );
      process.exit(0);
    }

    const collectOrm = await promptOrm(ormChoices);
    const needTests = await promptTest();
    let testRunner;
    const { tests } = needTests;

    if (tests) {
      testRunner = await promptTestRunner();
    } else {
      return createApp({
        ...appName,
        ...collectFrameworkAndDb,
        ...collectOrm,
        tests,
      });
    }

    // send details of app
    return createApp({
      ...appName,
      ...collectFrameworkAndDb,
      ...collectOrm,
      tests,
      ...testRunner,
    });
  } else {
    chooseConsoleColorText(
      colorSet.error,
      "\n------Value entered is wrong. Use -- e.g nodejs-api-cli -h --------\n"
    );
    process.exit(0);
  }
});
