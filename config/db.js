const mongoose = require("mongoose");

const DB_URI = `mongodb://127.0.0.1:27017/Lavadero`;

module.exports = () => {
  const connectDB = async () => {
    try {
      await mongoose.connect(DB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // serverSelectionTimeoutMS: 5000,
        // retryWrites: true,
      });
      console.log("Conexión exitosa! :)");
    } catch (error) {
      console.log("ERROR :(", error);
    }
  };

  connectDB();
};
