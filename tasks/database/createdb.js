const createDb = `import { User } from '../models';
User.sync().then(() => {
    console.log("Successfully created User tables tables")
}).catch(error => {
    console.log("The error: ", error)
});
`;

exports = module.exports = createDb;
