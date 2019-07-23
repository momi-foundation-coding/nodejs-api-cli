const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
import { packageJson, gitIgnore, readMe, babel } from './data';

function createFiles(name) {
    if (!name) {
        console.log('------You must add the name of your application-------');
    }
    const foldersToAdd = ['src/controllers', 'src/routes', 'src/middlewares', 'src/config', 'src/models', 'test']
    const folders = foldersToAdd.map(folder => `${name}/${folder}`);
    // Create the main folder. Need investigation
    fs.mkdir(name, err => {
        if (err) throw err
    });

    // Create different files such as packages, readme etc.
    const packageFile = fs.createWriteStream(`${name}/package.json`);
    const gitignoreFile = fs.createWriteStream(`${name}/.gitignore`);
    fs.createWriteStream(`${name}/.env`);
    const readmeFile = fs.createWriteStream(`${name}/README.md`);
    const appFile = fs.createWriteStream(`${name}/app.js`);
    const babelFile = fs.createWriteStream(`${name}/.babelrc`);

    // Get current directory
    const currentDirectory = path.basename(__dirname);

    // Application base directory
    const appBaseDirectory = path.basename(name);

    // Copy files to app.js
    fs.copyFile(`${currentDirectory}/files/app.js`, `${appFile.path}`, err => {
        if (err) throw err
    });

    // Stringify data
    const packageJsonData = JSON.stringify(packageJson(name), null, "\t");
    const gitIgnoreData = JSON.stringify(gitIgnore);
    const readMeData = JSON.stringify(readMe(name));
    const babelData = JSON.stringify(babel);
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

    folders.forEach(function (folder) {
        fs.mkdir(folder, { recursive: true }, (err) => {
            if (err) throw err
            const files = `${folder}/index.js`;
            fs.createWriteStream(files);
            // Copy files to test files
            fs.copyFile(`${currentDirectory}/files/app.test.js`, `${name}/test/index.js`, err => {
                if (err) throw err
            });
            console.log(`----------created file----- ${files}------`);
        });
    });
}

// Creating the main application
const createApp = (name) => {
    createFiles(name);
};

// Remove the first 2 arguments
const args = process.argv.slice(2);

// Convert into a module that can be used as CLI
args.forEach((value, index) => {
    return createApp(value);
});
