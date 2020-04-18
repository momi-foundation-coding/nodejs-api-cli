/**
 * function to allow installation of dependancies
 */
const path = require("path");
const util = require("util");
const { exec } = require("child_process");

const execPromisified = util.promisify(exec);
// Internal imports
const { chooseConsoleColorText, colorString } = require("./utils/consolecolors");
const colorSet = require("./utils/colorsets");

const installingDependancies = async (details) => {
  const {
    appName,
    framework,
    database,
    orm,
    testFramework,
    expectationLibrary,
  } = details;
  const appBaseDirectory = path.basename(appName);
  // database adapters used in SQL.
  let databaseAdapter;

  if (database.toLowerCase() === "sqlite") {
    databaseAdapter = "sqlite3";
  } else if (database.toLowerCase() === "postgres") {
    databaseAdapter = "pg";
  }

  const startInstallation = await execPromisified(
    'echo "\n Going to start installing dependancies now"'
  );

  chooseConsoleColorText(colorSet.log, `\n ${startInstallation.stdout}`);

  const dependancies = [
    "body-parser",
    "dotenv",
    "cors",
    "bcrypt",
    `${framework.toLowerCase()}`,
    `${orm && orm !== "No ORM" ? `${orm.toLowerCase()}` : ""}`,
    `${databaseAdapter ? `${databaseAdapter}` : ""}`,
  ];

  const devDependancies = [
    `${testFramework ? `${testFramework.toLowerCase()}` : ""}`,
    `${expectationLibrary ? `${expectationLibrary.toLowerCase()}` : ""}`,
    "chai-http",
    "nyc",
    "@babel/core",
    "@babel/preset-env",
    "@babel/cli",
    "@babel/node",
    "standard"
  ];

  // install @ dependancy
  dependancies.forEach(async (dependancy) => {
    await execPromisified(
      `cd ${appBaseDirectory} && npm install ${dependancy}`
    );
    chooseConsoleColorText(
      colorSet.normal,
      `\n Installed ${colorString(colorSet.log, `${dependancy}`)} in the application.`
    );
  });

  // install all dev dependancies
  devDependancies.forEach(async (dependancy) => {
    await execPromisified(
      `cd ${appBaseDirectory} && npm install -D ${dependancy}`
    );
    chooseConsoleColorText(
      colorSet.normal,
      `\n Installed dev dependancy ${colorString(colorSet.log, `${dependancy}`)} in the application.`
    );
  });

  execPromisified(
    `cd ${appBaseDirectory} && 
    git init && 
    git add . && 
    git commit -m "Set up application"`
  );

  // install all if not added to node_modules
  process.on("exit", async () => {
    await execPromisified(`cd ${appBaseDirectory} && npm run fix`)
    await execPromisified(`cd ${appBaseDirectory} && npm install`);
    chooseConsoleColorText(colorSet.normal, `\n Clean up installs`);
  });
};

module.exports = installingDependancies;
