#!/usr/bin/env node
'use strict';

/**
 * External imports/Nodejs imports
 */
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const readline = require("readline");
const { PassThrough, Writable } = require("stream");

/**
 * Internal imports
 */
const dataInFiles = require("../tasks/data");
const chooseYourColorText = require("./consolecolors");
const colorSet = require("./colorsets");

const writable = new Writable();
const pass = new PassThrough();

const installingDependancies = (name) => {
    const appBaseDirectory = path.basename(name);
    // For now, shell command is run inside this file, but need to be removed later
    const cmd = `
        cd ${appBaseDirectory}
        set -e 
        echo setting up git for you application
        git init
        echo Will install your dependancies shortly....
        echo We are installing dependancies, please wait...
        npm install express 
        npm install body-parser 
        npm install cors 
        npm install sequelize
        npm install pg 
        npm install bcrypt
        npm install pg-hstore
        echo Install dev dependancies, please wait...
        npm install -D @babel/cli 
        npm install -D @babel/core 
        npm install -D @babel/node 
        npm install -D @babel/preset-env 
        npm install -D chai-http 
        npm install -D chai 
        npm install -D mocha 
        npm install -D nyc
        echo adding files to git and committing
        git add . && git commit -m "create app"
    `

    // Install dependancies and dev dependancies
    exec(cmd, (error, stdout, stderror) => {
        if (error) {
            console.error(`exec error: ${exec}`);
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderror: ${stderror}`);
        console.log('------------Thanks for being patient-------------');
    });
}

/**
 * Func to see if true for two values. 
 * @param {*} firstValue 
 * @param {*} secondValue 
 * It does not substitute === or !== 
 */

const isObjectSame = (firstValue, secondValue) => {
    return Object.is(firstValue, secondValue);
}

/**
 * Start of an error message
 */

const startErrorMessageConsole = () => {
    chooseYourColorText(colorSet.error, "--------------------Start----------------------");
    chooseYourColorText(colorSet.error, "--------------------Error----------------------");
}

/**
 * End of error message
 */

const endErrorMessageConsole = () => {
    chooseYourColorText(colorSet.error, "--------------------Error----------------------");
    chooseYourColorText(colorSet.error, "--------------------End----------------------");
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
    fs.createWriteStream(`${name}/.env`);
    const readmeFile = fs.createWriteStream(`${name}/README.md`);
    const babelFile = fs.createWriteStream(`${name}/.babelrc`);

    // Create data var for all the 
    const gitIgnoreData = dataInFiles.gitIgnore;
    const packageJsonData = JSON.stringify(dataInFiles.packageJson(name), null, "\t");
    const readMeData = dataInFiles.readMe(name);
    const babelData = dataInFiles.babel;

    // Create an array for all files needed [pathname, data]
    const fileDataArr = [
        { pathname: packageFile.path, data: packageJsonData },
        { pathname: gitignoreFile.path, data: gitIgnoreData },
        { pathname: readmeFile.path, data: readMeData },
        { pathname: babelFile.path, data: babelData },
    ]

    // For each file, append data using fn openAppendFile
    fileDataArr.forEach(file => {
        openAppendFile(file.pathname, file.data)
    });
}

const createSrcDirAndFiles = (appName) => {
    const foldersToAdd = ['src/controllers', 'src/routes', 'src/config', 'src/scripts', 'src/models', 'src/middlewares', 'test', 'src']
    const folders = foldersToAdd.map(folder => `${appName}/${folder}`);
    folders.forEach((folder) => {
        fs.mkdir(folder, { recursive: true }, err => {
            if (err) throw err;
            // Check created files and createstream of the files
            const mainFiles = `${folder}/index.js`;
            const fileName = fs.createWriteStream(mainFiles);

            // Scripts file, which include running migrations and dropping db
            const scriptsArr = [
                `${appName}/src/scripts`
            ]

            if (scriptsArr.includes(folder)) {
                // Create a script to create tables 
                const createDbFile = `${appName}/src/scripts/createdb.js`;
                const createDbFileName = fs.createWriteStream(createDbFile);
                const createDbData = dataInFiles.createDb;
                openAppendFile(createDbFileName.path, createDbData);
                // Create a script to drop tables
                const dropDbFile = `${appName}/src/scripts/dropdb.js`;
                const dropDbFileName = fs.createWriteStream(dropDbFile);
                const dropDbData = dataInFiles.dropDb;
                openAppendFile(dropDbFileName.path, dropDbData);
            }

            // Write sequelize instance and create models here
            const modelsArr = [
                `${appName}/src/models`
            ]

            if (modelsArr.includes(folder)) {
                // Set up for sequelize database
                const sequelizeSetupFile = `${appName}/src/models/setup.js`;
                const sequelizeSetupFileName = fs.createWriteStream(sequelizeSetupFile);
                const pathName = sequelizeSetupFileName.path;
                const sequelizeData = dataInFiles.sequelizeSetupData;
                openAppendFile(pathName, sequelizeData);

                // Create user table and its fields 
                const userModels = `${appName}/src/models/user.js`;
                const userModelsFileName = fs.createWriteStream(userModels);
                openAppendFile(userModelsFileName.path, dataInFiles.userModelData);
            }

            // Write to test file.
            if (fileName.path === `${appName}/test/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.appJsTest;
                openAppendFile(pathName, data);
            };

            // Add data to the main entry point
            if (fileName.path === `${appName}/src/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.appJs;
                openAppendFile(pathName, data);
            };

            // Paths that needs files such as user.js, config may not need it.
            const pathsThatNeedBaseFiles = [
                `${appName}/src/middlewares`,
                `${appName}/src/routes`,
                `${appName}/src/controllers`
            ]
            // Now create file user.js in specified directories
            if (pathsThatNeedBaseFiles.includes(folder)) {
                /**
                 * In the base directories create user.js file
                 * [For middleware, routes, controllers]
                */
                const directoryFiles = `${folder}/user.js`;
                const directoryFileName = fs.createWriteStream(directoryFiles);
                if (directoryFileName.path === `${appName}/src/middlewares/user.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.userMiddleware;
                    openAppendFile(pathName, data);
                }
                if (directoryFileName.path === `${appName}/src/routes/user.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.userRouter;
                    openAppendFile(pathName, data);
                }
                if (directoryFileName.path === `${appName}/src/controllers/user.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.userController;
                    openAppendFile(pathName, data);
                }
            };

            // Write to different files including the index.js and other files
            if (fileName.path === `${appName}/src/middlewares/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.middleware;
                openAppendFile(pathName, data);
            }
            if (fileName.path === `${appName}/src/routes/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.routes;
                openAppendFile(pathName, data);
            }
            if (fileName.path === `${appName}/src/controllers/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.controllers;
                openAppendFile(pathName, data);
            }
            if (fileName.path === `${appName}/src/models/index.js`) {
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
const createMainDir = name => {
    if (!name) {
        console.log('------You must add the name of your application-------');
    }
    fs.mkdir(name, err => {
        if (err) throw err
    });
    const appBaseDirectory = path.basename(name);
    createSrcDirAndFiles(appBaseDirectory);
}

// Creating the main application
const createApp = async (name) => {
    await createMainDir(name);
    await createRouteDirFiles(name);
    await installingDependancies(name);
};

// Remove the first 2 arguments
const args = process.argv.slice(2);

// Convert into a module that can be used as CLI
// args.forEach((value, index) => {
//     return createApp(value);
// });

const createServer = (name, packages) => {
    console.log({ name })
    console.log({ packages })
    process.exit(0)
}

// Create a readline interface with a completer
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create an inquirer to ask user for inputs
args.forEach((value, index) => {
    if (!value || value !== 'init') {
        console.log('Use kemboijs-cli init [For dev: npm start init]');
        process.exit(1);
    }
    let packagesRequired = {};
    const appName = [];
    /**
     * Use write to write to the command line.
     * Create a Readstream for the same.
     * Also checking on module tty if it is possible to be used.
    */

    rl.question('What is the name of your application? ', (name) => {
        appName.push({ name });
        rl.question('Which framework do you want to use? ', (framework) => {
            /**
             * Catch name of framework in lowercase and
             * Check against the available frameworks
             */
            const framValueCheck = isObjectSame(framework.toLowerCase().trim(), "express") ||
                isObjectSame(framework.toLowerCase().trim(), "kemboijs")

            if (framValueCheck === false) {
                // Do some console log for error messages
                startErrorMessageConsole();
                chooseYourColorText(colorSet.error, "You either typed framework wrongly or \n unsupported framework at the moment")
                endErrorMessageConsole();
                rl.close();
            }
            packagesRequired.framework = framework;
            rl.question("Which database do you want to use? ", (database) => {
                const checkDatabaseIfValid = isObjectSame(database.toLowerCase().trim(), "postgres") ||
                    isObjectSame(database.toLowerCase().trim(), "mongodb");
                if (checkDatabaseIfValid === false) {
                    startErrorMessageConsole();
                    chooseYourColorText(colorSet.error, "-------------Either typed wrong or \n we are not supporting the database--------")
                    endErrorMessageConsole();
                }

                packagesRequired.database = database;
                rl.question(`Which ORM is your choice? `, (orm) => {
                    if (packagesRequired.database === "postgres") {
                        console.log({ packagesRequired })
                        // Allow only postgres ORMs
                    } else if (packagesRequired.database === "mongodb") {
                        // Allow only mongodb ORMs
                    }
                    packagesRequired.orm = orm;
                    rl.question("Do you needs tests? ", (test) => {
                        /**
                         * When user does not need test, run the applications
                         * Make it case insensitive
                         * Call createServer() when answer is No otherwise continue
                         */

                        test.toLowerCase() === 'no' ? createServer(appName, packagesRequired) : null;
                        rl.question("Choose your test runner? ", (testRunner) => {
                            packagesRequired.testRunner = testRunner;
                            rl.question("Choose BDD tools? ", (bdd) => {
                                packagesRequired.bdd = bdd;
                                createServer(appName, packagesRequired);
                            })
                        })
                    })
                })
            })
        });
    });

    rl.on('close', () => {
        console.log("An error occurred or terminated successfully.")
        process.exit(0);
    });
})
