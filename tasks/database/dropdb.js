const dropDb = `
import { User } from '../models';

export default User.drop(() => {
    console.log('Successfully dropped db')
}).catch(error => {
    console.log("The Error", error);
});
`;

exports = module.exports = dropDb;
