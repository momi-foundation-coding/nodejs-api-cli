"use strict";const databaseScripts=`
import createdb from './createdb';
import dropdb from './dropdb';

/**
 * Export scripts to allow easy
 * running on create database and drop db in tests
 */
const databaseScripts = {
    createdb,
    dropdb
}

export default databaseScripts
`;module.exports="\nimport createdb from './createdb';\nimport dropdb from './dropdb';\n\n/**\n * Export scripts to allow easy\n * running on create database and drop db in tests\n */\nconst databaseScripts = {\n    createdb,\n    dropdb\n}\n\nexport default databaseScripts\n";