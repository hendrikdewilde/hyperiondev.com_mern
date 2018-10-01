let Task = require("../models/task.model");

exports.apiListTaskAllUsers = function(req, res) {
  // Retrieve and return all tasks from the database.
  Task.find(function(err, tasks) {
    if (err) {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving tasks." });
      //console.log(err);
    } else {
      res.send(tasks);
    }
  });
};

exports.apiListTask = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else {
    let query = { user_id: req.params.userId };
    Task.find(query, function(err, tasks) {
      if (err) {
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving tasks." });
      } else {
        res.send(tasks);
      }
    });
  }
};

exports.apiListCompletedTask = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else {
    let query = { user_id: req.params.userId, complete: true };
    Task.find(query, function(err, tasks) {
      if (err) {
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving tasks." });
      } else {
        res.send(tasks);
      }
    });
  }
};

exports.apiListUncompletedTask = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else {
    let query = { user_id: req.params.userId, complete: false };
    Task.find(query, function(err, tasks) {
      if (err) {
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving tasks." });
      } else {
        res.send(tasks);
      }
    });
  }
};

exports.apiListDeadlineTask = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else {
    let currentDate = new Date();
    let query = {
      user_id: req.params.userId,
      date: { $lt: currentDate },
      complete: false
    };
    Task.find(query, function(err, tasks) {
      if (err) {
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving tasks." });
      } else {
        res.send(tasks);
      }
    });
  }
};

exports.apiListOutstandingTask = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else {
    let currentDate = new Date();
    let query = {
      user_id: req.params.userId,
      date: { $gte: currentDate },
      complete: false
    };
    Task.find(query, function(err, tasks) {
      if (err) {
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving tasks." });
      } else {
        res.send(tasks);
      }
    });
  }
};

exports.apiListCompletedLastMonthTask = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    let query = {
      user_id: req.params.userId,
      date: { $gte: currentDate },
      complete: true
    };
    Task.find(query, function(err, tasks) {
      if (err) {
        res
          .status(500)
          .send({ message: "Some error occurred while retrieving tasks." });
      } else {
        res.send(tasks);
      }
    });
  }
};

exports.apiAddTask = function(req, res) {
  // Create and Save a new Task
  //console.log(req.body);
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else if (!req.body.user_id) {
    res.status(400).send({ message: "Task user_id can not be empty" });
  } else if (!req.body.title) {
    res.status(400).send({ message: "Task Title can not be empty" });
  } else if (!req.body.date) {
    res.status(400).send({ message: "Task Date can not be empty" });
  } else {
    let task = new Task({
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content || "New Task",
      date: req.body.date,
      complete: false
    });
    task.save(function(err, data) {
      if (err) {
        //console.log(err);
        res
          .status(500)
          .send({ message: "Some error occurred while creating the Task." });
      } else {
        res.send(data);
      }
    });
  }
};

exports.apiViewTask = function(req, res) {
  // Retrieve and return all tasks from the database.
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else if (!req.params.taskId) {
    res.status(500).send({ message: "taskId in URL can not be empty" });
  } else {
    Task.findById(req.params.taskId, function(err, task) {
      if (err) {
        res.status(500).send({
          message: "Error retrieving task with id " + req.params.taskId
        });
      } else {
        if (!task) {
          return res.status(404).send({
            message: "Task not found with id " + req.params.taskId
          });
        } else {
          res.send(task);
        }
      }
    });
  }
};

exports.apiEditTask = function(req, res) {
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else if (!req.params.taskId) {
    res.status(500).send({ message: "taskId in URL can not be empty" });
  } else {
    if (!req.body.user_id) {
      res.status(400).send({ message: "Task user_id can not be empty" });
    } else if (!req.body.title) {
      res.status(400).send({ message: "Task Title can not be empty" });
    } else if (!req.body.date) {
      res.status(400).send({ message: "Task Date can not be empty" });
    } else {
      Task.findByIdAndUpdate(
        req.params.taskId,
        {
          user_id: req.body.user_id,
          title: req.body.title,
          content: req.body.content || "New Task",
          date: req.body.date,
          complete: req.body.complete
        },
        { new: true } //The {new: true} option in the findByIdAndUpdate() method is used to return the modified document to the then() function instead of the original.
      )
        .then(task => {
          if (!task) {
            return res.status(404).send({
              message: "Task not found with id " + req.params.taskId
            });
          } else {
            res.send(task);
          }
        })
        .catch(err => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Task not found with id " + req.params.taskId
            });
          }
          return res.status(500).send({
            message: "Error updating Task with id " + req.params.taskId
          });
        });
    }
  }
};

exports.apiDeleteTask = function(req, res) {
  if (!req.params.userId) {
    res.status(500).send({ message: "userId in URL can not be empty" });
  } else if (!req.params.taskId) {
    res.status(500).send({ message: "taskId in URL can not be empty" });
  } else {
    Task.findByIdAndRemove(req.params.taskId, function(err) {
      if (err) {
        res.status(500).send({
          message: "Error retrieving task with id " + req.params.taskId
        });
      } else {
        res.send({ message: "Task deleted successfully!" });
      }
    });
  }
};
