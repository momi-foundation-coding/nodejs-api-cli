const noSequelizeUserModelData = `
export const createTables = async () => {
    const contactTable = \`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR NOT NULL,
        password VARCHAR NOT NULL,
        created_date TIMESTAMP)\`;
    await pool.query(contactTable);
};
`

exports = module.exports = noSequelizeUserModelData;
