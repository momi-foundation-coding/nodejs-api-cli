const databaseScripts = `
import createTables from './create-tables';
import dropTables from './drop-tables';

/**
 * Export scripts to allow easy
 * running on create database and drop db in tests
 */
const databaseScripts = {
    createTables,
    dropTables
}

export default databaseScripts
`;

module.exports = databaseScripts;
