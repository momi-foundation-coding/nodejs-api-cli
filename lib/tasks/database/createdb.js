"use strict";const createDb=`
import { User } from '../models';

export default User.sync().then(() => {
    console.log("Successfully created User tables tables")
}).catch(error => {
    console.log("The error: ", error)
});
`;module.exports="\nimport { User } from '../models';\n\nexport default User.sync().then(() => {\n    console.log(\"Successfully created User tables tables\")\n}).catch(error => {\n    console.log(\"The error: \", error)\n});\n";