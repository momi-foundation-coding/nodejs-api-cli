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
    /**
     * define database adapter to be used
     * which depends on the database used e.g postgres uses pg
     * also, make sure that to assign small letter/exactly what to be installed
     * to avoid it needing .toLowerCase() manipulation
     */
    let databaseAdapter;

    if (database.toLowerCase() === 'sqlite') {
        // To small letter for sqlite3 -> 
        // as stated above where databaseAdapter is defined
        databaseAdapter = 'sqlite3'
    } else if (database.toLowerCase() === 'postgres') {
        databaseAdapter = "pg"
    }

    /**
     * let commands be in an array 
     * then, loop through each array 
     * install each dependancy one by one
     */
    let cdBaseDirectory = `cd ${appBaseDirectory}`
    const commands = [
        `${cdBaseDirectory}`,
        `set -e`,
        `echo Will install your dependancies shortly....`,
        `echo We are installing dependancies, please wait...`,
        `${cdBaseDirectory} && npm install ${framework.toLowerCase()}`,
        `${cdBaseDirectory} && npm install body-parser`,
        `${cdBaseDirectory} && npm install cors`,
        `${cdBaseDirectory} && ${orm && orm !== 'No ORM' ? `npm install ${orm.toLowerCase()}` : ''}`,
        `${cdBaseDirectory} && ${databaseAdapter ? `npm install ${databaseAdapter}` : ''}`,
        `${cdBaseDirectory} && npm install dotenv`,
        `${cdBaseDirectory} && npm install bcrypt`,
        `echo Starting to install dev dependancies, please wait...`,
        `${cdBaseDirectory} && npm install -D @babel/cli`,
        `${cdBaseDirectory} && npm install -D @babel/core`,
        `${cdBaseDirectory} && npm install -D @babel/node`,
        `${cdBaseDirectory} && npm install -D @babel/preset-env`,
        `${cdBaseDirectory} && npm install -D chai-http`,
        `${cdBaseDirectory} && ${expectationLibrary ? `npm install -D ${expectationLibrary.toLowerCase()}` : ''}`,
        `${cdBaseDirectory} && ${testFramework ? `npm install -D ${testFramework.toLowerCase()}` : ''}`,
        `${cdBaseDirectory} && npm install -D nyc`,
        `echo Initializing git for you application`,
        `${cdBaseDirectory} && git init`,
        `echo adding folders and files changes`,
        /**
         * it seems it initialize the repo, add the first files such as .babelrc, readme.md etc 
         * except folders src/, test/ and file .lock. 
         * it also commits the first files
         * User can commit the changes, but might look into this later.
         */
        `${cdBaseDirectory} && git add .`,
        `echo committing your changes`,
        `${cdBaseDirectory} && git commit -m "create nodejs-api starter app"`
    ]
    /**
     * run each command and return its response
     */
    commands.forEach(command => {
        exec(command, (error, stdout, stderr) => {
            chooseConsoleColorText(
                colorSet.normal,
                `We are still in the process of installation .......`
            );
            if (error) {
                chooseConsoleColorText(colorSet.error, `exec error: ${exec}`);
                return;
            }
            if (stderr) {
                chooseConsoleColorText(colorSet.error, `stderror: ${stderr}`);
                return;
            }
            chooseConsoleColorText(colorSet.normal, `stdout: ${stdout}`);
        });
    });
}

exports = module.exports = installingDependancies;
