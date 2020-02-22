/**
 * where to get user controllers
 */
const userController = `import { User } from "../models";
import responseHandler from "../helpers/responsehandler";

export default class UserController {
    // Create a user
    static async createUser(req, res) {
    const userDetails = req.body;
    const user = await User.create(userDetails);
    if (!user) {
        return responseHandler(
        res,
        "An error occurred while creating user",
        400
        );
    }
    return responseHandler(
        res,
        "User created successfully",
        201,
        user
    );
    }
    // Get all users from the database
    static async getUsers(req, res) {
    const users = await User.findAll();
    if (!users || users.length <= 0) {
        return responseHandler(
        res,
        "There are no currently users",
        404
        );
    }
    return responseHandler(
        res,
        "Successfully retrieved users successfully.",
        200,
        users
    );
    }
    // Get a single user from the db
    static async getUser(req, res) {
    const { id } = req.params;
    const user = await User.findAll({
        where: {
        id
        },
        attributes: { exclude: ["password"] }
    });
    if (!user) {
        return responseHandler(
        res,
        "The user with that id does not exist",
        404
        );
    }
    return responseHandler(
        res,
        "User details retrieved successfully",
        200,
        user
    );
    }
    // Update user details
    static async updateUser(req, res) {
    const userDetails = req.body;
    const { id } = req.params;
    const user = await User.update(userDetails, {
        where: {
        id
        }
    });
    if (!user) {
        return responseHandler(
        res,
        "An error occurred while creating user",
        400
        );
    }
    return responseHandler(
        res,
        "User details updated successfully",
        200,
        user
    );
    }
    // Delete user
    static async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.destroy({
        where: {
        id
        }
    });
    return responseHandler(
        res,
        "User deleted successfully",
        201
    );
    }
}
`;

exports = module.exports = userController;
