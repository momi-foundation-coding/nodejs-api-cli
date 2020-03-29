const promptAppName = require("./name");
const promptFrameworkDb = require("./frameworkdb");
const promptOrm = require("./orm");
const { promptTest, promptTestRunner } = require("./test");

module.exports = {
  promptAppName,
  promptFrameworkDb,
  promptOrm,
  promptTest,
  promptTestRunner,
};
