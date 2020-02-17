const mongoDbController = `
import { User } from "../models/user";

export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const newUserDetails = { firstName, lastName, email, password };
    const Newuser = new User(newUserDetails);
    const data = await Newuser.save();
    res.status(201).send({
      message: "User created successfully",
      data
    });
};
export const getUsers = async (req, res) => {
    const data = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      data
    });
};

export const getUser = async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById({ _id });
    res.status(200).send({
      message: "User fetched successfully",
      data: user || {}
    });
};
export const updateUser = async (req, res) => {
    const _id = req.params.id;
    const { firstName, lastName, email, password } = req.body;
    const data = await User.update(
      { _id },
      { $set: { firstName, lastName, email, password } },
      { multi: true, new: true }
    );
    res.status(201).send({
      message: "User updated successfully",
      data
    });
};
export const deleteUser = async (req, res) => {
    const _id = req.params.id;
    const data = await User.remove({ _id });
    res.status(201).send({
      message: "User deleted successfully",
      data
    });
};`;
exports = module.exports = mongoDbController;
