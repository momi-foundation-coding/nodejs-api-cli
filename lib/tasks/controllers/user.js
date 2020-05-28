"use strict";/**
 * where to get user controllers
 */const userController=a=>{let b="";return b="mongodb"===a.toLowerCase()?".n":"[0]",`import { UserService } from "../services";
    import responseHandler from "../helpers/responsehandler";
    
    export default class UserController {
      // Create a user
      static async createUser(req, res) {
          const userDetails = req.body;
          const user = await UserService.createUser(userDetails);
          return responseHandler(res, "User created successfully", 201, user);
      }
      // Get all users
      static async getUsers(req, res) {
          const users = await UserService.getUsers();
          if (!users || users.length <= 0) {
            return responseHandler(res, "There are no currently users", 404);
          }
          return responseHandler(res, "Successfully retrieved users successfully", 200, users);
      }
      // Get a single user
      static async getUser(req, res) {
          const { id } = req.params;
          const user = await UserService.getUser(id);
    
          if (!user || user.length < 1) {
              return responseHandler(res, "The user with that id does not exist", 404);
          }
          return responseHandler(res, "User details retrieved successfully", 200, user);
      }
      // Update user details
      static async updateUser(req, res) {
          const userDetails = req.body;
          const { id } = req.params;
          const updatedUser = await UserService.updateUser(id, userDetails);
    
          if (!updatedUser || updatedUser${b} === 0) {
            return responseHandler(res, "No user with that Id", 404 );
          }
    
          return responseHandler(res, "User details updated successfully", 200, updatedUser);
      }
      // Delete user
      static async deleteUser(req, res) {
          const { id } = req.params;
          await UserService.deleteUser(id);
          return responseHandler( res, "User deleted successfully", 200);
      }
    }`};module.exports=userController;