const { prompt } = require("inquirer");

const promptOrm = (ormChoices) => {
  return prompt([
    {
      type: "list",
      name: "orm",
      message: "Which ORM is your choice?",
      choices: ormChoices,
      default: "Sequelize",
    },
  ]);
};

module.exports = promptOrm;
