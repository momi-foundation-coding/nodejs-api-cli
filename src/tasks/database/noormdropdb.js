const noOrmDropDb = `import db from '../models/setup';
db.query('drop database users', (err, result) => {
    if (err) {
        console.log("The Error", error);
    }
    console.log('Successfully dropped db')
}); `;

module.exports = noOrmDropDb;
