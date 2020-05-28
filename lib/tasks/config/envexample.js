"use strict";const envExample=a=>{let b="postgres://localhost:5432/dbname",c="postgres://localhost:5432/dbnametest";return"mongodb"===a.toLowerCase()&&(c="mongodb://localhost:27017/dbnametest",b="mongodb://localhost:27017/dbname"),`TEST_DATABASE_URL=${b}
    DATABASE_URL=${c}
    NODE_ENV="development"`};module.exports=envExample;