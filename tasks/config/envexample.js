const envExample = (db) => {
  let mainUrl = "postgres://localhost:5432/dbname";
  let testUrl = "postgres://localhost:5432/dbnametest";

  if (db.toLowerCase() === "mongodb") {
    testUrl = "mongodb://localhost:27017/dbnametest";
    mainUrl = "mongodb://localhost:27017/dbname";
  }

  return `TEST_DATABASE_URL=${mainUrl}
    DATABASE_URL=${testUrl}
    NODE_ENV="development"`;
};

module.exports = envExample;
