const noOrmUserController = `import db from '../models/setup';
import {
    allUsersQuery,
    singleUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery
} from '../scripts/queries';
import responseHandler from '../helpers/responsehandler';
const {
    query
} = db;
export const getAllUsersController = (res) => {
    query(allUsersQuery, (err, result) => {
        if (err) {
            return responseHandler(res, err, 500);
        }
        return responseHandler(res, 'User retrieved succesfully', 200, result.rows);
    });
}
export const getUserController = (req, res) => {
    query(singleUserQuery, (err, result) => {
        if (err) {
            return responseHandler(res, err, 500);
        }
        return responseHandler(res, 'User retrieved succesfully', 200, result.rows)
    });
}
export const signupUserController = (req, res) => {
    await query(createUserQuery, async (err, result) => {
        if (err) {
            return responseHandler(res, err, 500);
        }
        return responseHandler(res, 'User successfully created', 201, result.rows)
    })
}

export const updateUserController = (req, res) => {
    query(updateUserQuery, (err, resut) => {
        if (err) {
            return responseHandler(res, err, 500);
        }
        return responseHandler(res, 'Successfully updated user details', 201, resut.rows)
    });
}
export const deleteUserController = (req, res) => {
    query(deleteUserQuery, (err, result) => {
        if (err) {
            return responseHandler(res, err, 500);
        }
        return responseHandler(res, 'User deleted successfully', 201)

    });
}`;

module.exports = noOrmUserController;
