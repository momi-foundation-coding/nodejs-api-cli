"use strict";const noOrmcreateDb=`import db from '../models/setup';
db.query('create database users', (err, result) => {
    if (err) {
        console.log("The Error", error);
    }
    console.log('Successfully dropped db')
}); `;module.exports="import db from '../models/setup';\ndb.query('create database users', (err, result) => {\n    if (err) {\n        console.log(\"The Error\", error);\n    }\n    console.log('Successfully dropped db')\n}); ";