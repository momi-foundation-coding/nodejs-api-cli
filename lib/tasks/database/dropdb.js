"use strict";const dropDb=`
import { User } from '../models';

export default User.drop(() => {
    console.log('Successfully dropped db')
}).catch(error => {
    console.log("The Error", error);
});
`;module.exports="\nimport { User } from '../models';\n\nexport default User.drop(() => {\n    console.log('Successfully dropped db')\n}).catch(error => {\n    console.log(\"The Error\", error);\n});\n";