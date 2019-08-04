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
    const cmd = `cd ${appBaseDirectory}
    set -e 
    echo Will install your dependancies shortly....
    echo We are installing dependancies, please wait...
    echo -------Please wait as we install your dependancies-------
    npm install express body-parser cors 
    echo Install dev dependancies, please wait...
    npm install -D @babel/cli @babel/core @babel/node @babel/preset-env chai-http chai mocha nyc
    echo -------Dont worry, we are also install dev dependancies-------`

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

const createRouteDirFiles = (name) => {
    // Create different files such as packages, readme etc.
    const packageFile = fs.createWriteStream(`${name}/package.json`);
    const gitignoreFile = fs.createWriteStream(`${name}/.gitignore`);
    fs.createWriteStream(`${name}/.env`);
    const readmeFile = fs.createWriteStream(`${name}/README.md`);
    const babelFile = fs.createWriteStream(`${name}/.babelrc`);

    // Stringify data
    const packageJsonData = JSON.stringify(dataInFiles.packageJson(name), null, "\t");
    const gitIgnoreData = JSON.stringify(dataInFiles.gitIgnore);
    const readMeData = JSON.stringify(dataInFiles.readMe(name));
    const babelData = JSON.stringify(dataInFiles.babel);
    packageFile.write(packageJsonData);
    gitignoreFile.write(JSON.parse(gitIgnoreData));
    readmeFile.write(JSON.parse(readMeData));
    babelFile.write(JSON.parse(babelData));

    packageFile.on('finish', () => {
        console.log('------successfully written to package.json file------');
    });

    packageFile.end();

    gitignoreFile.on('finish', () => {
        console.log('----------Written data to .gitignore file-------------');
    });
    gitignoreFile.end();

    readmeFile.on('finish', () => {
        console.log('------------Written successfully to readme------------');
    });
    readmeFile.end();

    babelFile.on('finish', () => {
        console.log('-----Finally we created our babelrc file--------');
    });
    babelFile.end();
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

const createSrcDirAndFiles = (appName) => {
    const foldersToAdd = ['src/controllers', 'src/routes', 'src/middlewares', 'src/config', 'src/models', 'test', 'src']
    const folders = foldersToAdd.map(folder => `${appName}/${folder}`);
    folders.forEach((folder) => {
        fs.mkdir(folder, { recursive: true }, err => {
            if (err) throw err;
            // Check created files and createstream of the files
            const mainFiles = `${folder}/index.js`;
            const fileName = fs.createWriteStream(mainFiles);

            // Write to test file.
            if (fileName.path === `${appName}/test/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.appJsTest;
                openAppendFile(pathName, data);
            }

            // Add data to the main entry point
            if (fileName.path === `${appName}/src/index.js`) {
                const pathName = fileName.path;
                const data = dataInFiles.appJs;
                openAppendFile(pathName, data);
            }

            // Paths that needs files such as homebase.js, config may not need it.
            const pathsThatNeedBaseFiles = [
                `${appName}/src/middlewares`,
                `${appName}/src/routes`,
                `${appName}/src/controllers`
            ]
            // Now create file homebase.js in specified directories
            if (pathsThatNeedBaseFiles.includes(folder)) {
                const directoryFiles = `${folder}/homebase.js`;
                const directoryFileName = fs.createWriteStream(directoryFiles);
                if (directoryFileName.path === `${appName}/src/middlewares/homebase.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.homeBaseMiddleware;
                    openAppendFile(pathName, data);
                }
                if (directoryFileName.path === `${appName}/src/routes/homebase.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.homeBaseRouter;
                    openAppendFile(pathName, data);
                }
                if (directoryFileName.path === `${appName}/src/controllers/homebase.js`) {
                    const pathName = directoryFileName.path;
                    const data = dataInFiles.homeBaseControllers;
                    openAppendFile(pathName, data);
                }
            }

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
        });
    });
}

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
