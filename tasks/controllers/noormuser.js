const noOrmUserController = `import db from '../models/setup';
import { allUsersQuery, singleUserQuery, createUserQuery, updateUserQuery, deleteUserQuery } from '../scripts/queries';

const { query } = db;
export const getAllUsersController = (res) => {
    query(allUsersQuery, (err, result) => {
        if (err) {
            res.status(500).json({
                status: "500",
                Error: err
            })
        }
        res.status(200).json({
            status: '200',
            message: 'User retrieved succesfully',
            data: result.rows
        });
    });
}
export const getUserController = (req, res) => {
    query(singleUserQuery, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: "500",
                Error: err
            })
        }
        return res.status(200).json({
            status: '200',
            message: 'User retrieved succesfully',
            data: result.rows
        });
    });
}
export const signupUserController = (req, res) => {
    await query(createUserQuery, async (err, result) => {
        res.status(201).json({
            data: result,
            status: 201,
            message: 'User successfully created',
            data: resss.rows[0],
        });
    })
}
export const signinUserController = (req, res) => { }
export const updateUserController = (req, res) => {
    query(updateUserQuery, (err, resut) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                Error: err
            })
        }
        res.status(201).json({
            status: 201,
            message: 'Successfully updated user details',
            data: resut.rows[0],
        })
    });
}
export const deleteUserController = (req, res) => {
    query(deleteUserQuery, (err, result) => {
        res.status(201).json({
            data: result.rows,
            status: '201',
            message: 'User deleted successfully',
        })
        if (err) {
            res.status(500).json({
                status: 500,
                Error: err
            });
        }
    });
}

`;

module.exports = noOrmUserController;
