"use strict";const userMiddleware=`
import responseHandler from "../helpers/responsehandler";

export const createUserMiddleware = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return responseHandler(
            res,
            "User inputs provided are not valid/empty",
            400
        );
    }

    next();
}
`;module.exports="\nimport responseHandler from \"../helpers/responsehandler\";\n\nexport const createUserMiddleware = (req, res, next) => {\n    const { firstName, lastName, email, password } = req.body;\n    if (!firstName || !lastName || !email || !password) {\n        return responseHandler(\n            res,\n            \"User inputs provided are not valid/empty\",\n            400\n        );\n    }\n\n    next();\n}\n";