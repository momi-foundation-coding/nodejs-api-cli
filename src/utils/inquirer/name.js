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
            "\n\n------Name of Application is required-------\n"
          );
          return process.exit(0);
        }
        return true;
      },
    },
  ]);
};

module.exports = promptAppName;
