const userService = `
import { User } from "../models";

export default class UserService {
  // create user
  static async createUser(userDetails) {
    const user = await User.create(userDetails,  { raw: true });
    return user.dataValues;
  }

  // get users
  static async getUsers() {
    const users = await User.findAll( { raw: true });
    return users;
  }

  // get user
  static async getUser(id) {
    const user = await User.findOne({  raw: true, where: { id } });
    return user;
  }

  // update user
  static async updateUser(userDetails, id) {
    const userUpdated = await User.update(userDetails, {
      returning: true,
      raw: true,
      where: { id }
    });
    return userUpdated;
  }

  // delete user
  static async deleteUser(id) {
    const deletedUser = await User.destroy({
      where: {id}
    });
    return deletedUser;
  }
}`;

module.exports = userService;
