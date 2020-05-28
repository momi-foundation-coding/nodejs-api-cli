const userService = (db) => {
  let createUserData = "";
  let findUsers = "";
  let findUser = "";
  let updateUser = "";
  let deleteUser = "";

  if (db.toLowerCase() === "mongodb") {
    createUserData = `const Newuser = new User(userDetails);
      const user = await Newuser.save();
      return user;`;
    findUsers = `await User.find({});`;
    findUser = `await User.findById({ _id: id });`;
    updateUser = `const { firstName, lastName, email, password } = userDetails;
      const userUpdated = await User.update(
        { _id: id },
        { $set: { firstName, lastName, email, password } },
        { multi: true, new: true }
      );`;
    deleteUser = `await User.remove({ _id: id });`;
  } else {
    createUserData = `const user = await User.create(userDetails,  { raw: true });
      return user.dataValues;`;
    findUsers = `await User.findAll( { raw: true });`;
    findUser = `await User.findOne({  raw: true, where: { id } });`;
    updateUser = `const userUpdated = await User.update(userDetails, {
      returning: true,
      raw: true,
      where: { id }
    });`;
    deleteUser = `await User.destroy({ where: {id}});`;
  }

  return `import { User } from "../models";

    export default class UserService {
      // create user
      static async createUser(userDetails) {
        ${createUserData}
      }

      // get users
      static async getUsers() {
        const users = ${findUsers}
        return users;
      }
       
      // get user
      static async getUser(id) {
        const user = ${findUser}
        return user;
      }
      
      // update user
      static async updateUser(id, userDetails) {
        ${updateUser}
        return userUpdated;
      }

      // delete user
      static async deleteUser(id) {
        const deletedUser = ${deleteUser}
        return deletedUser;
      }
    }`;
};

module.exports = userService;
