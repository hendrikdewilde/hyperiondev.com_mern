const express = require("express");
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res) {
  //console.log("get route for test called");
  res.json([
    { id: 1, title: "Testing this task" },
    { id: 2, title: "Get React to interface with Express" }
  ]);
});

module.exports = router;
