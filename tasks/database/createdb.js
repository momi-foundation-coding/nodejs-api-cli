const createDb = `
import { User } from '../models';

export default User.sync().then(() => {
    console.log("Successfully created User tables tables")
}).catch(error => {
    console.log("The error: ", error)
});
`;

exports = module.exports = createDb;
