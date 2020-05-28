const { prompt } = require("inquirer");
const { chooseConsoleColorText } = require("../consolecolors");
const colorSet = require("../colorsets");

const promptAppName = () => {
  return prompt([
    {
      name: "appName",
      message: "What is the name of your application?",
      validate(input) {
        if (!input) {
          chooseConsoleColorText(
            colorSet.error,
            "\n\n------App name should not be empty-------\n"
          );
          return process.exit(0);
        }
        return true;
      },
    },
  ]);
};

module.exports = promptAppName;
