#!/usr/bin/env node
'use strict';

const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const { PassThrough, Writable } = require("stream");
const dataInFiles = require("../tasks/data");

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
        npm install dotenv
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
      { pathname: envExampleFile.path, data: envExampleData }
    ];

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
args.forEach((value, index) => {
    return createApp(value);
});
