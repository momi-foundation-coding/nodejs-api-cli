const userService = `
import { User } from "../models";

export default class UserService {
  // create user
  static async createUser(newUserDetails) {
    const Newuser = new User(newUserDetails);
    const user = await Newuser.save();
    return user;
  }

  // get users
  static async getUsers() {
    const users = await User.find({});
    return users;
  }

  // get user
  static async getUser(_id) {
    const user = await User.findById({ _id });
    return user;
  }

  // update user
  static async updateUser(_id, userDetails) {
    const { firstName, lastName, email, password } = userDetails;
    const userUpdated = await User.update(
      { _id },
      { $set: { firstName, lastName, email, password } },
      { multi: true, new: true }
    );

    return userUpdated;
  }

  // delete user
  static async deleteUser(_id) {
    const deletedUser = await User.remove({ _id });
    return deletedUser;
  }
}`

module.exports = userService;
