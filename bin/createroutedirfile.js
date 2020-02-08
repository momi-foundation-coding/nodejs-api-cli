/**
 * creating route directory files
 * @param {*} name 
 */
const fs = require("fs");

const openAppendFile = require("./openandappendfile");
const dataInFiles = require("../tasks/data");

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

exports = module.exports = createRouteDirFiles;
