/**
 * function to allow installation of dependancies
 */
const { exec } = require("child_process");
const path = require("path");

// Internal imports
const chooseConsoleColorText = require('./consolecolors');
const colorSet = require("./colorsets");

const installingDependancies = (details) => {
    const { appName, framework, database, orm, testFramework, expectationLibrary } = details;
    const appBaseDirectory = path.basename(appName);
    // define pg which is required for postgres
    let pgForORM;

    if (orm && orm.toLowerCase() === "sequelize") {
        pgForORM = "pg"
    }
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
        ${pgForORM ? `npm install ${pgForORM.toLowerCase()}` : ''}
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

exports = module.exports = installingDependancies;
