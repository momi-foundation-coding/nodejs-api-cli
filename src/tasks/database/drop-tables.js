const dropTables = `
import { User } from '../models';

export default User.drop(() => {
    console.log('Successfully dropped user table')
}).catch(error => {
    console.log("The Error", error);
});
`;

module.exports = dropTables;
