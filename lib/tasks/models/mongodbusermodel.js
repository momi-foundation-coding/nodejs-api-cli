"use strict";const mongoDbUserModelData=`import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    firstName: String,
    lastName:String,
    email: String,
    password: String,
  });
module.exports =  mongoose.model("User", userSchema);
`;module.exports="import mongoose from 'mongoose';\nconst userSchema = mongoose.Schema({\n    firstName: String,\n    lastName:String,\n    email: String,\n    password: String,\n  });\nmodule.exports =  mongoose.model(\"User\", userSchema);\n";