const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
import { packageJson, gitIgnore, readMe } from './data';

function createFiles(name) {
    if (!name) {
        console.log('------You must add the name of your application-------');
    }
    const foldersToAdd = ['src/controllers', 'src/routes', 'src/middlewares', 'src/config', 'src/models', 'test']
    const folders = foldersToAdd.map(folder => `${name}/${folder}`);
    fs.mkdir(name, err => {
        if (err) throw err
    });
    const packageFile = fs.createWriteStream(`${name}/package.json`);
    const gitignoreFile = fs.createWriteStream(`${name}/.gitignore`);
    fs.createWriteStream(`${name}/.env`);
    const readmeFile = fs.createWriteStream(`${name}/README.md`);
    const appFile = fs.createWriteStream(`${name}/app.js`);

    // Stringify data
    const packageJsonData = JSON.stringify(packageJson, null, "\t");
    const gitIgnoreData = JSON.stringify(gitIgnore);
    const readMeData = JSON.stringify(readMe(name));

    packageFile.write(packageJsonData);
    gitignoreFile.write(JSON.parse(gitIgnoreData));
    readmeFile.write(JSON.parse(readMeData));

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

    // Get current directory
    // const currentDirectory = path.basename(__dirname);

    // Application base directory
    const appBaseDirectory = path.basename(name);

    // For now, shell command is run inside this file, but need to be removed later
    const cmd = `cd ${appBaseDirectory}
    set -e 
    echo Will install your dependancies shortly....
    echo We are installing dependancies, please wait...
    echo -------Please wait as we install your dependancies-------
    npm install express body-parser cors 
    echo Install dev dependancies, please wait...
    npm install -D @babel/cli @babel/core @babel/node @babel/preset-env
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
            console.log(`----------created file----- ${files}------`);
        });
    });
}

// Creating the main application
const createApp = (name) => {
    createFiles(name);
}
// async function createApp(name) {

// };

// Convert into a module that can be used as CLI
exports = module.exports = createApp;
// createApp("kemboi");