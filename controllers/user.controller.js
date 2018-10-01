const User = require("../models/user.model");

exports.apiCheckCreateUser = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else {
    let query = { "google.id": req.params.userId };
    User.findOne(query, function(err, users) {
      if (err) {
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving user." });
      } else {
        if (users) {
          res.send(users);
        } else {
          //res.status(500).send({message: "Not a user."});
          if (!req.params.userId) {
            res.status(500).send({ message: "userId in URL can not be empty" });
          } else if (!req.body.email) {
            res.status(500).send({ message: "email in body can not be empty" });
          } else if (!req.body.name) {
            res.status(500).send({ message: "name in body can not be empty" });
          } else {
            let newUser = new User();
            // set all of the relevant information
            newUser.google.id = req.params.userId;
            newUser.google.imageUrl = req.body.imageUrl;
            newUser.google.name = req.body.name;
            newUser.google.email = req.body.email;

            // save the user
            newUser.save(function(err, data) {
              if (err) {
                //console.log(err);
                res.status(500).send({
                  message: "Some error occurred while creating the user."
                });
              } else {
                res.send(data);
              }
            });
          }
        }
      }
    });
  }
};

exports.apiUserProfile = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else {
    let query = { "google.id": req.params.userId };
    User.findOne(query, function(err, users) {
      if (err) {
        console.log(err);
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving user." });
      } else {
        if (users) {
          res.send(users);
        } else {
          res.status(500).send({ message: "Not a user." });
        }
      }
    });
  }
};
