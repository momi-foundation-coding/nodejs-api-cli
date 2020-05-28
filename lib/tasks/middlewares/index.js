"use strict";const middlewares=`
import { createUserMiddleware } from './user';

const userMiddleware = {
    createUserMiddleware
}

export default userMiddleware;

`;module.exports="\nimport { createUserMiddleware } from './user';\n\nconst userMiddleware = {\n    createUserMiddleware\n}\n\nexport default userMiddleware;\n\n";