const express = require("express");

const tasks = require("../controllers/task.controller");
const users = require("../controllers/user.controller");

const router = express.Router();

/* REST pages. */
router.get("/", function(req, res) {
  res.json({
    message:
      "Welcome to the Task application REST API. Create Tasks and keep them organized online"
  });
});

router.get("/taskAllUsers", tasks.apiListTaskAllUsers);
router.get("/:userId/task", tasks.apiListTask);
router.get("/:userId/taskCompleted", tasks.apiListCompletedTask);
router.get("/:userId/taskUncompleted", tasks.apiListUncompletedTask);
router.get("/:userId/taskDeadline", tasks.apiListDeadlineTask);
router.get("/:userId/taskOutstanding", tasks.apiListOutstandingTask);
router.get( "/:userId/taskCompletedLastMonth", tasks.apiListCompletedLastMonthTask);
router.post("/:userId/task", tasks.apiAddTask);
router.get("/:userId/task/:taskId", tasks.apiViewTask);
router.put("/:userId/task/:taskId", tasks.apiEditTask);
router.delete("/:userId/task/:taskId", tasks.apiDeleteTask);

router.post("/:userId/user", users.apiCheckCreateUser);
router.get("/:userId/profile", users.apiUserProfile);

module.exports = router;
