#!/usr/bin/env node
'use strict';

/**
 * Nodejs internal modules
 */
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

/**
 * External dependancies installed through npm
 */
var inquirer = require("inquirer");

/**
 * Internal imports goes here
 */
const dataInFiles = require("../tasks/data");
const chooseConsoleColorText = require('./consolecolors');
const colorSet = require("./colorsets");

const installingDependancies = (details) => {
    const { appName, framework, database, orm, testFramework, expectationLibrary } = details;
    const appBaseDirectory = path.basename(appName);
    // For now, shell command is run inside this file, but need to be removed later
    const cmd = `
        cd ${appBaseDirectory}
        set -e 
        echo setting up git for you application
        git init
        echo Will install your dependancies shortly....
        echo We are installing dependancies, please wait...
        npm install ${framework.toLowerCase()} 
        npm install body-parser 
        npm install cors 
        npm install ${orm.toLowerCase()}
        npm install dotenv
        npm install bcrypt
        echo Install dev dependancies, please wait...
        npm install -D @babel/cli 
        npm install -D @babel/core 
        npm install -D @babel/node 
        npm install -D @babel/preset-env 
        npm install -D chai-http 
        npm install -D ${expectationLibrary.toLowerCase()} 
        npm install -D ${testFramework.toLowerCase()} 
        npm install -D nyc
        echo adding files to git and committing
        git add . && git commit -m "create app and set up app"
    `

    // Install dependancies and dev dependancies
    exec(cmd, (error, stdout, stderror) => {
        if (error) {
            chooseConsoleColorText(colorSet.error, `exec error: ${exec}`);
        }
        chooseConsoleColorText(colorSet.normal, `stdout: ${stdout}`);
        chooseConsoleColorText(colorSet.error, `stderror: ${stderror}`);
        chooseConsoleColorText(colorSet.log, '------------Thanks for being patient-------------');
    });
}

// Opening files and writing to files utility function
const openAppendFile = (pathName, data) => {
    return fs.open(`${pathName}`, 'a', (err, fd) => {
        if (err) throw err;
        fs.appendFile(fd, `${data}`, 'utf8', (err) => {
            fs.close(fd, (err) => {
                if (err) throw err;
            });
            if (err) throw err;
        });
    });
}

const createRouteDirFiles = (name) => {
    // Create different files such as packages, readme etc.
    const packageFile = fs.createWriteStream(`${name}/package.json`);
    const gitignoreFile = fs.createWriteStream(`${name}/.gitignore`);
    const envFile = fs.createWriteStream(`${name}/.env`);
    const readmeFile = fs.createWriteStream(`${name}/README.md`);
    const babelFile = fs.createWriteStream(`${name}/.babelrc`);
    const envExampleFile = fs.createWriteStream(`${name}/.envExample`);

    // Create data var for all the 
    const gitIgnoreData = dataInFiles.gitIgnore;
    const packageJsonData = JSON.stringify(dataInFiles.packageJson(name), null, "\t");
    const readMeData = dataInFiles.readMe(name);
    const babelData = dataInFiles.babel;
    const envExampleData = dataInFiles.envExample;

    // Create an array for all files needed [pathname, data]
    const fileDataArr = [
        { pathname: packageFile.path, data: packageJsonData },
        { pathname: gitignoreFile.path, data: gitIgnoreData },
        { pathname: readmeFile.path, data: readMeData },
        { pathname: babelFile.path, data: babelData },
        { pathname: envFile.path, data: envExampleData },
        { pathname: envExampleFile.path, data: envExampleData }
    ];

    // For each file, append data using fn openAppendFile
    fileDataArr.forEach(file => {
        openAppendFile(file.pathname, file.data)
    });
}

const createSrcDirAndFiles = (details) => {
    const { appBaseDirectory, tests } = details;
    let foldersToAdd = ['src/controllers', 'src/routes', 'src/config', 'src/scripts', 'src/models', 'src/middlewares', 'src']
    if (tests) {
        foldersToAdd = ['src/controllers', 'src/routes', 'src/config', 'src/scripts', 'src/models', 'src/middlewares', 'test', 'src']
    }

    const folders = foldersToAdd.map(folder => {
        if (folder || folder !== undefined) {
            return `${appBaseDirectory}/${folder}`
        }
    });
    folders.forEach((folder) => {
        fs.mkdir(folder, { recursive: true }, err => {
            if (err) throw err;
            // Check created files and createstream of the files
            const mainFiles = `${folder}/index.js`;
            const fileName = fs.createWriteStream(mainFiles);

            // Scripts file, which include running migrations and dropping db
            const scriptsArr = [
                `${appBaseDirectory}/src/scripts`
            ]

            if (scriptsArr.includes(folder)) {
                // Create a script to create tables 
                const createDbFile = `${appBaseDirectory}/src/scripts/createdb.js`;
                const createDbFileName = fs.createWriteStream(createDbFile);
                const createDbData = dataInFiles.createDb;
                openAppendFile(createDbFileName.path, createDbData);
                // Create a script to drop tables
                const dropDbFile = `${appBaseDirectory}/src/scripts/dropdb.js`;
                const dropDbFileName = fs.createWriteStream(dropDbFile);
                const dropDbData = dataInFiles.dropDb;
                openAppendFile(dropDbFileName.path, dropDbData);
            }

            // Write sequelize instance and create models here
            const modelsArr = [
                `${appBaseDirectory}/src/models`
            ]

            if (modelsArr.includes(folder)) {
                // Set up for sequelize database
                const sequelizeSetupFile = `${appBaseDirectory}/src/models/setup.js`;
                const sequelizeSetupFileName = fs.createWriteStream(sequelizeSetupFile);
                const pathName = sequelizeSetupFileName.path;
                const sequelizeData = dataInFiles.sequelizeSetupData;
                openAppendFile(pathName, sequelizeData);

                // Create user table and its fields 
                const userModels = `${appBaseDirectory}/src/models/user.js`;
                const userModelsFileName = fs.createWriteStream(userModels);
                openAppendFile(userModelsFileName.path, dataInFiles.userModelData);
            }

            // Write to test file.
            if (fileName.path === `${appBaseDirectory}/test/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.appJsTest;
                openAppendFile(pathName, data);
            };

            // Add data to the main entry point
            if (fileName.path === `${appBaseDirectory}/src/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.appJs;
                openAppendFile(pathName, data);
            };

            // Paths that needs files such as user.js, config may not need it.
            const pathsThatNeedBaseFiles = [
                `${appBaseDirectory}/src/middlewares`,
                `${appBaseDirectory}/src/routes`,
                `${appBaseDirectory}/src/controllers`
            ]
            // Now create file user.js in specified directories
            if (pathsThatNeedBaseFiles.includes(folder)) {
                /**
                 * In the base directories create user.js file
                 * [For middleware, routes, controllers]
                */
                const directoryFiles = `${folder}/user.js`;
                const directoryFileName = fs.createWriteStream(directoryFiles);
                if (directoryFileName.path === `${appBaseDirectory}/src/middlewares/user.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.userMiddleware;
                    openAppendFile(pathName, data);
                }
                if (directoryFileName.path === `${appBaseDirectory}/src/routes/user.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.userRouter;
                    openAppendFile(pathName, data);
                }
                if (directoryFileName.path === `${appBaseDirectory}/src/controllers/user.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.userController;
                    openAppendFile(pathName, data);
                }
            };

            // Write to different files including the index.js and other files
            if (fileName.path === `${appBaseDirectory}/src/middlewares/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.middleware;
                openAppendFile(pathName, data);
            }
            if (fileName.path === `${appBaseDirectory}/src/routes/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.routes;
                openAppendFile(pathName, data);
            }
            if (fileName.path === `${appBaseDirectory}/src/controllers/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.controllers;
                openAppendFile(pathName, data);
            }
            if (fileName.path === `${appBaseDirectory}/src/models/index.js`) {
                openAppendFile(fileName.path, `export { default as User } from './user';`)
            }
        });
    });
}

/**
 * func to create the main directory
 * later we can allow user to manipulate if app is already existing
 * such as adding more controllers or tables/models
*/
const createMainDir = (details) => {
    const { appName, tests } = details;
    fs.mkdir(appName, err => {
        if (err) {
            chooseConsoleColorText(colorSet.error, '\n\n--------There is a file with the same name chosen-----------\n');
            process.exit(0);
        } else {
            const appBaseDirectory = path.basename(appName);
            createSrcDirAndFiles({ appBaseDirectory, tests });
        }
    });
}

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
