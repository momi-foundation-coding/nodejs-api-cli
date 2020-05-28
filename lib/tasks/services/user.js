"use strict";const userService=a=>{let b="",c="",d="",e="",f="";return"mongodb"===a.toLowerCase()?(b=`const Newuser = new User(userDetails);
      const user = await Newuser.save();
      return user;`,c=`await User.find({});`,d=`await User.findById({ _id: id });`,e=`const { firstName, lastName, email, password } = userDetails;
      const userUpdated = await User.update(
        { _id: id },
        { $set: { firstName, lastName, email, password } },
        { multi: true, new: true }
      );`,f=`await User.remove({ _id: id });`):(b=`const user = await User.create(userDetails,  { raw: true });
      return user.dataValues;`,c=`await User.findAll( { raw: true });`,d=`await User.findOne({  raw: true, where: { id } });`,e=`const userUpdated = await User.update(userDetails, {
      returning: true,
      raw: true,
      where: { id }
    });`,f=`await User.destroy({ where: {id}});`),`import { User } from "../models";

    export default class UserService {
      // create user
      static async createUser(userDetails) {
        ${b}
      }

      // get users
      static async getUsers() {
        const users = ${c}
        return users;
      }
       
      // get user
      static async getUser(id) {
        const user = ${d}
        return user;
      }
      
      // update user
      static async updateUser(id, userDetails) {
        ${e}
        return userUpdated;
      }

      // delete user
      static async deleteUser(id) {
        const deletedUser = ${f}
        return deletedUser;
      }
    }`};module.exports=userService;