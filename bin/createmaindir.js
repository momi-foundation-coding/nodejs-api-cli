/**
 * func to create the main directory
 * later we can allow user to manipulate if app is already existing
 * such as adding more controllers or tables/models
 */
const fs = require("fs");
const path = require("path");

const createSrcDirAndFiles = require("./createsrcdirandfiles");
const chooseConsoleColorText = require("./utils/consolecolors");
const colorSet = require("./utils/colorsets");

const createMainDir = details => {
  const { appName, tests, orm, database } = details;
  fs.mkdir(appName, err => {
    if (err) {
      chooseConsoleColorText(
        colorSet.error,
        "\n\n--------There is a file with the same name chosen-----------\n"
      );
      process.exit(0);
    } else {
      const appBaseDirectory = path.basename(appName);
      createSrcDirAndFiles({ appBaseDirectory, tests, database, orm });
    }
  });
};

module.exports = createMainDir;
