/**
 * creating src directories and files
 * @param {*} details 
 */
const fs = require("fs");

const openAppendFile = require("./openandappendfile");
const dataInFiles = require("../tasks/data");

const createSrcDirAndFiles = (details) => {
    const { appBaseDirectory, tests, orm } = details;
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
                let createDbData;
                if(orm && orm.toLowerCase() === 'sequelize'){
                    createDbData = dataInFiles.createDb
                }
                else{
                    createDbData = dataInFiles.noOrmcreateDb
                }
                openAppendFile(createDbFileName.path, createDbData);
                // Create a script to drop tables

                // Use the procedure down
                const dropDbFile = `${appBaseDirectory}/src/scripts/dropdb.js`;
                const dropDbFileName = fs.createWriteStream(dropDbFile);
                let dropDbData;
                if(orm && orm.toLowerCase() === 'sequelize'){
                    dropDbData = dataInFiles.dropDb
                }
                else{
                    dropDbData = dataInFiles.noOrmDropDb
                }
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
                let modelData;
                if(orm && orm.toLowerCase() === 'sequelize'){
                    modelData = dataInFiles.sequelizeSetupData;
                }
                else{
                    modelData = dataInFiles.noSequelizeSetupData;
                }                
                openAppendFile(pathName, modelData);

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

exports = module.exports = createSrcDirAndFiles;
