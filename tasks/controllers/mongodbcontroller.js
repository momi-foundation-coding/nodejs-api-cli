const mongoDbController = `
import { User } from "../models/user";
import responseHandler from "../helpers/responsehandler";

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUserDetails = { firstName, lastName, email, password };
  const Newuser = new User(newUserDetails);
  const data = await Newuser.save();
  responseHandler(res, "User created successfully", 201, data);
};
export const getUsers = async (req, res) => {
  const data = await User.find({});
  responseHandler(res, "Users fetched successfully", 200, data);
};

export const getUser = async (req, res) => {
  const _id = req.params.id;
  const data = await User.findById({ _id });
  responseHandler(res, "User fetched successfully", 200, data);
};
export const updateUser = async (req, res) => {
  const _id = req.params.id;
  const { firstName, lastName, email, password } = req.body;
  const data = await User.update(
    { _id },
    { $set: { firstName, lastName, email, password } },
    { multi: true, new: true }
  );
  responseHandler(res, "User updated successfully", 201, data);
};
export const deleteUser = async (req, res) => {
  const _id = req.params.id;
  const data = await User.remove({ _id });
  responseHandler(res, "User deleted successfully", 201, data);
};`;
exports = module.exports = mongoDbController;
