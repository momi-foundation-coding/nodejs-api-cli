const databaseScripts = `
import createTables from './create-tables';
import dropdb from './dropdb';

/**
 * Export scripts to allow easy
 * running on create database and drop db in tests
 */
const databaseScripts = {
    createTables,
    dropdb
}

export default databaseScripts
`;

module.exports = databaseScripts;
