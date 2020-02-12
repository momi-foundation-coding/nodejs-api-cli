const noOrmcreateDb = `import db from '../models/setup';
db.query('create database users', (err, result) => {
    if (err) {
        console.log("The Error", error);
    }
    console.log('Successfully dropped db')
}); `;

exports = module.exports = noOrmcreateDb;
