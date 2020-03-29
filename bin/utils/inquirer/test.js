const { prompt } = require('inquirer');

const promptTest = () => {
  return prompt([
    {
      type: "confirm",
      name: "tests",
      message: "Do you needs tests(Y/N)?",
      default: ["Y"]
    }
  ]);
}

const promptTestRunner = () => {
  return prompt([
    {
      type: "list",
      name: "testFramework",
      message: "Which testing framework do you want to use?",
      /**
       * Need to add more choices e.g
       * choices: ['Mocha', 'Jasmine'],
       */
      choices: ["Mocha"],
      default: "Mocha"
    },
    {
      type: "list",
      name: "expectationLibrary",
      message: "Which expectation library do you want to use?",
      choices: ["chai"],
      default: "chai"
    }
  ]);
}

module.exports = {
  promptTest,
  promptTestRunner
}
