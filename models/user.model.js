var mongoose = require("mongoose");

// define the schema for our user model
const userSchema = mongoose.Schema({
  google: {
    id: String,
    imageUrl: String,
    email: String,
    name: String
  }
});

module.exports = mongoose.model("User", userSchema);
