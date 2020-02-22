
const databaseScripts = `
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
`

exports = module.exports = databaseScripts
