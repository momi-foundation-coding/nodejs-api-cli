const userMiddleware = `
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
`;

exports = module.exports = userMiddleware;
