#!/usr/bin/env node
'use strict';

/**
 * Nodejs internal modules
 */

/**
 * External dependancies installed through npm
 */
var inquirer = require("inquirer");

/**
 * Internal imports goes here
 */
const chooseConsoleColorText = require('./consolecolors');
const colorSet = require("./colorsets");
const installingDependancies = require("./installingdependancies");
const createMainDir = require("./createmaindir");
const createRouteDirFiles = require("./createroutedirfile");

// Creating the main application
const createApp = async (details) => {
    const { appName, framework, database, orm, tests, testFramework, expectationLibrary } = details;
    await createMainDir({ appName, tests });
    await createRouteDirFiles(appName);
    await installingDependancies({ appName, framework, database, orm, testFramework, expectationLibrary });
};

// Remove the first 2 arguments
const args = process.argv.slice(2);

// Convert into a module that can be used as CLI
args.forEach(async (value, index) => {
    /**
     * Need to test when user only writes kemboijs-cli
     */

    if (!value) {
        chooseConsoleColorText(colorSet.error, '------\nValue is required  e.g kemboijs-cli init--------\n');
        process.exit(0);
    } else if (value === 'version' || value === '-v') {
        console.log('\n-----------------Check version-------------\n')
        chooseConsoleColorText(colorSet.log, 'Version: 1.2.0')
        console.log('\n-------------Thanks for checking our version-------------\n')
    } else if (value === 'help' || value === '-h') {
        console.log('\n-----------------Asking for help-------------\n')
        chooseConsoleColorText(colorSet.log, 'New Project: kemboijs-cli init\n')
        chooseConsoleColorText(colorSet.log, 'Help: kemboijs-cli help or kemboijs-cli -- -h \n')
        chooseConsoleColorText(colorSet.log, 'Version: kemboijs-cli version or kemboijs-cli -- -v \n')
        chooseConsoleColorText(colorSet.log, 'Documentation: https://kemboijs.github.io/kemboijs.org/ \n')
        console.log('\n-------------We hope we helped-------------\n')
    } else if (value === 'init') {
        const appName = await inquirer.prompt([
            {
                name: 'appName',
                message: 'What is the name of your application? ',
                validate: function (value) {
                    /**
                     * More validation for app name can be done in the future
                     * E.g allowing only alpha or eliminating spaces and other stuff. 
                     * Can just have regex here
                     */

                    if (!value) {
                        chooseConsoleColorText(colorSet.error, '\n\n------App name should not be empty-------\n')
                        return process.exit(0);
                    }
                    return true;
                }
            },
        ]);

        const collectFrameworkAndDb = await inquirer.prompt([
            {
                type: 'list',
                name: 'framework',
                message: 'Which framework do you want to use?',
                /**
                 * Need to add more choices e.g 
                 * choices: ['Express', 'KemboiJs', 'Koa'],
                 */
                choices: ['Express'],
                default: 'Express'
            },
            {
                type: 'list',
                name: 'database',
                message: 'Which database do you want to use?',
                /**
                 * Need to add more choices e.g 
                 * choices: ['Postgres', 'MongoDB'],
                 */
                choices: ['Postgres'],
                default: 'Postgres'
            }
        ]);

        const { database } = collectFrameworkAndDb;

        let ormChoices = [];

        /**
         * Select the ORMs based on the database provided above.
         */
        if (database === 'Postgres') {
            ormChoices.push('Sequelize')
        } else if (database === 'MongoDB') {
            ormChoices.push('mongoose')
        } else {
            chooseConsoleColorText(colorSet.error, '\n------Error occurred while collecting database details------\n');
            process.exit(0);
        }

        const collectOrm = await inquirer.prompt([
            {
                type: 'list',
                name: 'orm',
                message: 'Which ORM is your choice?',
                choices: ormChoices
            }
        ]);

        const needTests = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'tests',
                message: 'Do you needs tests(Y/N)?',
                default: ['Y']
            }
        ]);

        let testRunner;
        const { tests } = needTests;

        if (tests) {
            testRunner = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'testFramework',
                    message: 'Which testing framework do you want to use?',
                    /**
                     * Need to add more choices e.g 
                     * choices: ['Mocha', 'Jasmine'],
                     */
                    choices: ['Mocha'],
                    default: 'Mocha'
                }, {
                    type: 'list',
                    name: 'expectationLibrary',
                    message: 'Which expectation library do you want to use?',
                    choices: ['chai'],
                    default: 'chai'
                }
            ]);
        } else {
            return createApp({ ...appName, ...collectFrameworkAndDb, ...collectOrm, tests });
        }

        /**
         * Spread to get details on the tools to make use of.
         */
        return createApp({ ...appName, ...collectFrameworkAndDb, ...collectOrm, tests, ...testRunner });
    } else {
        chooseConsoleColorText(colorSet.error, '\n------Value entered is wrong. Use -- e.g kemboijs-cli -- -h --------\n');
        process.exit(0);
    }
});
