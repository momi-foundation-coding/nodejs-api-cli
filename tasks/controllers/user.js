/**
 * where to get user controllers
 */
const userController =
    `import {User} from '../models';
export default class UserController {
    // Create a user
    static async createUser(req, res) {
        const userDetails = req.body;
        const user = await User.create(userDetails);
        if(!user) {
            res.status(400).send({
                message: "An error occurred while creating user"
            });
        }
        res.status(201).send({
            message: "User created successfully", 
            user
        });
    }
    // Get all users from the database
    static async getUsers(req, res) {
        const users =  await User.findAll();
        if(!users || users.length <= 0) {
            return res.status(404).send({
                message: "There are no currently users"
            });
        }
        return res.status(200).send({
            message: "Successfully retrieved users successfully.",
            users
        });
    }
    // Get a single user from the db
    static async getUser(req, res) {
        const { id } = req.params;
        const user = await User.findAll({
            where: {
                id
            },
            attributes: { exclude: [ 'password' ] }
        });
        if(!user) {
            res.status(404).send({
                message: "The user with that id does not exist"
            });
        }
        res.status(200).send({
            message: "User details retrieved successfully",
            user
        })
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
        if(!user) {
            res.status(400).send({
                message: "An error occurred while creating user"
            });
        }
        res.status(200).send({
            message: "User details updated successfully", 
            user
        });
    }
    // Delete user
    static async deleteUser(req, res) {
        const { id } = req.params;
        const user = await User.destroy({
            where: {
                id
            }
        });
        res.status(200).send({
            message: "User deleted successfully"
        });
    }
}
`

// This controller will have to go to its file e.g index.js
const controllers = `export { default as UserController } from './user';`

module.exports = {
    userController,
    controllers,
}