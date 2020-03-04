/**
 * import all data modules in this file
 * e.g import envExample from ./config/envexample
 * make it easy to import in other modules and files
 */
const envExample = require("./config/envexample");
const packageJson = require("./config/packagejson");
const gitIgnore = require("./config/gitignore");
const readMe = require("./config/readme");
const babel = require("./config/babel");
const controllers = require("./controllers");
const userController = require("./controllers/user");
const userModelData = require("./models/sequelizeusermodel");
const noSequelizeSetupData = require("./database/nosequelizesetup");
const sequelizeSetupData = require("./database/sequelizedata");
const middleware = require("./middlewares");
const userMiddleware = require("./middlewares/user");
const noSequelizeUserModelData = require("./models/nosequelizeusermodel");
const routes = require("./routes");
const userRouter = require("./routes/user");
const routeTest = require("./tests/routes");
const middlewareTest = require("./tests/middleware");
const useControllerTest = require("./tests/userController");
const appJs = require("./app");
const noOrmUserController = require("./controllers/noormuser");
const userQueries = require("./database/userqueries");
const noOrmDropDb = require("./database/noormdropdb");
const noOrmcreateDb = require("./database/noormcreatedb");
const dropDb = require("./database/dropdb");
const createDb = require("./database/createdb");
const mongoDbSetup = require("./database/mongodbsetup");
const mongoDbUserModelData = require('./models/mongodbusermodel');
const mongoDbController = require('./controllers/mongodbcontroller');
const responseHelper = require("./helpers/responsehelper");
const databaseScripts = require("./database/scripts");

module.exports = {
  packageJson,
  gitIgnore,
  readMe,
  babel,
  envExample,
  controllers,
  userController,
  userModelData,
  noSequelizeSetupData,
  sequelizeSetupData,
  middleware,
  userMiddleware,
  noSequelizeUserModelData,
  routes,
  userRouter,
  routeTest,
  middlewareTest,
  useControllerTest,
  appJs,
  noOrmUserController,
  userQueries,
  noOrmDropDb,
  noOrmcreateDb,
  dropDb,
  createDb,
  mongoDbSetup,
  mongoDbUserModelData,
  mongoDbController,
  responseHelper,
  databaseScripts
};
