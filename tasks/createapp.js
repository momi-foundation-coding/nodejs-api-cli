var fs = require("fs");

// Package file data.
// const packageJson = {
//     "name": "My App",
//     "version": "1.0.0",
//     "main": "index.js",
//     "scripts": {
//         "start": "node ./src/index.js",
//         "test": "run test"
//     }
// }

// Creating the main application
function createApp(name, dir) {
    if (!name) {
        console.log('------You must add the name of your application-------');
    } else {
        const foldersToAdd = ['src/controllers', 'src/routes', 'src/middlewares', 'src/config', 'src/models', 'test']
        const folders = foldersToAdd.map(folder => `${name}/${folder}`);

        folders.forEach(function (folder) {
            fs.mkdir(folder, { recursive: true }, (err) => {
                if (err) throw err
                fs.createWriteStream(`${name}/package.json`);
                fs.createWriteStream(`${name}/.gitignore`);
                fs.createWriteStream(`${name}/.env`);
                fs.createWriteStream(`${name}/README.md`);
                const files = `${folder}/index.js`;
                fs.createWriteStream(files)
                console.log(`----------created file----- ${files}------`);
            });
        });
    }
};

// Convert into a module that can be used as CLI
exports = module.exports = createApp;
// createApp("kemboi")