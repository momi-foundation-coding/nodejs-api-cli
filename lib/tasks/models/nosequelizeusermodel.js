"use strict";const noSequelizeUserModelData=`
export const createTables = async () => {
    const contactTable = \`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        created_date TIMESTAMP)\`;
    await pool.query(contactTable);
};
`;module.exports="\nexport const createTables = async () => {\n    const contactTable = `CREATE TABLE IF NOT EXISTS users (\n        id SERIAL PRIMARY KEY,\n        first_name VARCHAR(128) NOT NULL,\n        last_name VARCHAR NOT NULL,\n        password VARCHAR NOT NULL,\n        created_date TIMESTAMP)`;\n    await pool.query(contactTable);\n};\n";