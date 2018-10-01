const mongoose = require("mongoose");

// MongoDB
//const uri = 'mongodb+srv://test_user_hdw:H3ndr!kdW@hendrikdewilde-vpgng.gcp.mongodb.net/MyTaskProject?retryWrites=true';
const uri =
  "mongodb://test_user_hdw:H3ndr!kdW@hendrikdewilde-shard-00-00-vpgng.gcp.mongodb.net:27017,hendrikdewilde-shard-00-01-vpgng.gcp.mongodb.net:27017,hendrikdewilde-shard-00-02-vpgng.gcp.mongodb.net:27017/MyTaskProject?ssl=true&replicaSet=hendrikdewilde-shard-0&authSource=admin&retryWrites=true";

mongoose.Promise = global.Promise;
mongoose.connect(
  uri,
  {
    //useMongoClient: true
  }
);

mongoose.connection.on("error", function() {
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});

mongoose.connection.once("open", function() {
  console.log("Successfully connected to the database");
});
