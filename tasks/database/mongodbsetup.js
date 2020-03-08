const mongoDbSetup = `import mongoose from 'mongoose';
const database =  'mongodb://localhost/Test_server';
const connect = async () => {
    try {
      await mongoose.connect(database);
      console.log("connected");
    } catch {
      console.log("err", err);
    }
  };
  connect();`;

module.exports = mongoDbSetup;
