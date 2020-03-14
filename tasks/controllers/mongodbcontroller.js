const mongoDbController = `
import { UserService } from "../services";
import responseHandler from "../helpers/responsehandler";

export default class UserController {
  // create user
  static async createUser(req, res) {
    const newUserDetails = req.body;
    const user = await UserService.createUser(newUserDetails)
    return responseHandler(res, "User created successfully", 201, user);
  }
  // get all users 
  static async getUsers(req, res) {
    const users = await UserService.getUsers();
    return responseHandler(res, "Users fetched successfully", 200, users);
  }
  // get user
  static async getUser(req, res) {
    const _id = req.params.id;
    const user = await UserService.getUser(_id);
    return responseHandler(res, "User fetched successfully", 200, user);
  }
  // update user
  static async updateUser(req, res) {
    const _id = req.params.id;
    const userDetails = req.body;
    const user = await UserService.updateUser(_id, userDetails);
    return responseHandler(res, "User updated successfully", 200, user);
  }
  // delete user
  static async deleteUser(req, res) {
    const _id = req.params.id;
    const user = UserService.deleteUser(_id);
    return responseHandler(res, "User deleted successfully", 200, user);
  }
}
`;
module.exports = mongoDbController;
