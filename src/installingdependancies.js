/**
 * function to allow installation of dependancies
 */
const path = require("path");
const util = require("util");
const { exec } = require("child_process");

const execPromisified = util.promisify(exec);
// Internal imports
const {
  chooseConsoleColorText,
  colorString,
} = require("./utils/consolecolors");
const colorSet = require("./utils/colorsets");
const { LinkedList } = require("./common-ds")

/**
 * make use of linked list when installing dependancies
 * to make sure that the first dependancy is added 
 * before the second dependancy -> in order installation
 */
class DependancyLinkedList extends LinkedList {
  constructor() {
      super()
  }

  async installDependancy(command, appBaseDirectory) {
      if(!this.head) {
          console.log('No dependancies added to this linked list')
      } else {
          let curr = this.head
          
          while(curr) {
              if(curr.value) {
                  let dependancy = curr.value
                  console.log(`..........Starting to install ${dependancy}`)
                  // install dependancies in order
                  await execPromisified(
                    `cd ${appBaseDirectory} && ${command} ${dependancy}`
                  );
                  chooseConsoleColorText(
                    colorSet.normal,
                    `\n Installed ${colorString(
                      colorSet.log,
                      `${dependancy}`
                    )} in the application.`
                  );
              } 
              // move current to the next node
              curr = curr.next
          }
      }
  }

  // run any operations/commands such as git init
  runFinalCommands(appBaseDirectory) {
    if(!this.head) {
      console.log('No commands to run')
    } else {
      let curr = this.head
      while(curr) {
        if(curr.value) {
          let command = curr.value
          console.log(`.......Running command: ${command}`)
          execPromisified(`cd ${appBaseDirectory} && ${command}`);
        }
        // move current to the next node
        curr = curr.next
      }
    }
  }
}

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
    "@babel/register",
    "standard",
  ];

  // install @ dependancy
  const dependanciesLinkedList = new DependancyLinkedList()
  // add all dependancies to linked list
  await dependanciesLinkedList.addAll(dependancies)
  // iterate through each and install dependancies
  await dependanciesLinkedList.installDependancy('npm install', appBaseDirectory)

  // install all dev dependancies
  const devDependanciesLinkedList = new DependancyLinkedList()
  // add all dev dependancies to list
  await devDependanciesLinkedList.addAll(devDependancies)
  // iterate through each and install dependancies
  await devDependanciesLinkedList.installDependancy('npm install -D', appBaseDirectory)

  // operations to run after installation of dependancies
  const runLastOperations = [
    'npm run fix', 'npm install', 
    'git init', 'git add .', 'git commit -m "initial set up'
  ]

  const newOperations = new DependancyLinkedList()
  await newOperations.runFinalCommands(runLastOperations)

  // install all if not added to node_modules
  process.on("exit", async () => {
    // run linter fix, npm install & git operations
    await newOperations.run(appBaseDirectory)
    chooseConsoleColorText(colorSet.normal, `\n Successfully created the application`);
  });
};

module.exports = installingDependancies;
