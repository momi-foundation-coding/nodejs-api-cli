const mongoDbUserModelData = `import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    firstName: String,
    lastName:String,
    email: String,
    password: String,
  });
module.exports =  mongoose.model("User", userSchema);
`;
exports = module.exports = mongoDbUserModelData;
