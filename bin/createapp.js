#!/usr/bin/env node

/**
 * Nodejs internal modules
 */

/**
 * External dependancies installed through npm
 */
const inquirer = require("inquirer");

/**
 * Internal imports goes here
 */
const chooseConsoleColorText = require("./utils/consolecolors");
const colorSet = require("./utils/colorsets");
const installingDependancies = require("./installingdependancies");
const createMainDir = require("./createmaindir");
const createRouteDirFiles = require("./createroutedirfile");

// Creating the main application
const createApp = async details => {
  const {
    appName,
    framework,
    database,
    orm,
    tests,
    testFramework,
    expectationLibrary
  } = details;
  await createMainDir({ appName, tests, orm, database });
  await createRouteDirFiles(appName);
  await installingDependancies({
    appName,
    framework,
    database,
    orm,
    testFramework,
    expectationLibrary
  });
};

// Remove the first 2 arguments
const args = process.argv.slice(2);

// Convert into a module that can be used as CLI
// eslint-disable-next-line consistent-return
args.forEach(async value => {
  /**
   * Need to tests when user only writes nodejs-api-cli
   */

  if (!value) {
    chooseConsoleColorText(
      colorSet.error,
      "------\nValue is required  e.g nodejs-api-cli init--------\n"
    );
    process.exit(0);
  } else if (value === "version" || value === "-v") {
    console.log("\n-----------------Check version-------------\n");
    chooseConsoleColorText(colorSet.log, "Version: 1.2.0");
    console.log(
      "\n-------------Thanks for checking our version-------------\n"
    );
  } else if (value === "help" || value === "-h") {
    console.log("\n-----------------Asking for help-------------\n");
    chooseConsoleColorText(colorSet.log, "New Project: nodejs-api-cli init\n");
    chooseConsoleColorText(
      colorSet.log,
      "Help: nodejs-api-cli help or nodejs-api-cli -- -h \n"
    );
    chooseConsoleColorText(
      colorSet.log,
      "Version: nodejs-api-cli version or nodejs-api-cli -- -v \n"
    );
    chooseConsoleColorText(
      colorSet.log,
      "Documentation: https://kemboijs.github.io/kemboijs.org/ \n"
    );
    console.log("\n-------------We hope we helped-------------\n");
  } else if (value === "init") {
    const appName = await inquirer.prompt([
      {
        name: "appName",
        message: "What is the name of your application? ",
        validate(input) {
          /**
           * More validation for app name can be done in the future
           * E.g allowing only alpha or eliminating spaces and other stuff.
           * Can just have regex here
           */

          if (!input) {
            chooseConsoleColorText(
              colorSet.error,
              "\n\n------App name should not be empty-------\n"
            );
            return process.exit(0);
          }
          return true;
        }
      }
    ]);

    const collectFrameworkAndDb = await inquirer.prompt([
      {
        type: "list",
        name: "framework",
        message: "Which framework do you want to use?",
        /**
         * Need to add more choices e.g
         * choices: ['Express', 'KemboiJs', 'Koa'],
         */
        choices: ["Express"],
        default: "Express"
      },
      {
        type: "list",
        name: "database",
        message: "Which database do you want to use?",
        /**
         * Need to add more choices e.g
         * choices: ['Postgres', 'MongoDB', 'Sqlite],
         */
        choices: ["Postgres", "Sqlite", "MongoDB"],
        default: "Postgres"
      }
    ]);

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

    const collectOrm = await inquirer.prompt([
      {
        type: "list",
        name: "orm",
        message: "Which ORM is your choice?",
        choices: ormChoices,
        default: "Sequelize"
      }
    ]);

    const needTests = await inquirer.prompt([
      {
        type: "confirm",
        name: "tests",
        message: "Do you needs tests(Y/N)?",
        default: ["Y"]
      }
    ]);

    let testRunner;
    const { tests } = needTests;

    if (tests) {
      testRunner = await inquirer.prompt([
        {
          type: "list",
          name: "testFramework",
          message: "Which testing framework do you want to use?",
          /**
           * Need to add more choices e.g
           * choices: ['Mocha', 'Jasmine'],
           */
          choices: ["Mocha"],
          default: "Mocha"
        },
        {
          type: "list",
          name: "expectationLibrary",
          message: "Which expectation library do you want to use?",
          choices: ["chai"],
          default: "chai"
        }
      ]);
    } else {
      return createApp({
        ...appName,
        ...collectFrameworkAndDb,
        ...collectOrm,
        tests
      });
    }

    /**
     * Spread to get details on the tools to make use of.
     */
    return createApp({
      ...appName,
      ...collectFrameworkAndDb,
      ...collectOrm,
      tests,
      ...testRunner
    });
  } else {
    chooseConsoleColorText(
      colorSet.error,
      "\n------Value entered is wrong. Use -- e.g nodejs-api-cli -- -h --------\n"
    );
    process.exit(0);
  }
});
