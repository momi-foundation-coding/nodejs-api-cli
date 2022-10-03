const { prompt } = require("inquirer");

const promptTest = () => {
  return prompt([
    {
      type: "confirm",
      name: "tests",
      message: "Require Unit Tests(Y/N)?",
      default: ["Y"],
    },
  ]);
};

const promptTestRunner = () => {
  return prompt([
    {
      type: "list",
      name: "testFramework",
      message: "Choose testing framework?",
      /**
       * Need to add more choices e.g
       * choices: ['Mocha', 'Jasmine'],
       */
      choices: ["Mocha"],
      default: "Mocha",
    },
    {
      type: "list",
      name: "expectationLibrary",
      message: "Choose testing library?",
      choices: ["chai"],
      default: "chai",
    },
  ]);
};

module.exports = {
  promptTest,
  promptTestRunner,
};
