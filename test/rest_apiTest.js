const chai = require("chai");
const chaiHttp = require("chai-http");
//const server = require("../app");
const should = chai.should();

chai.use(chaiHttp);

const expect = chai.expect;
const request = require("request");

describe("Status - taskAllUsers", function() {
  describe("taskAllUsers page", function() {
    it("status /restApi/taskAllUsers GET", function(done) {
      request("http://localhost:3001/restApi/taskAllUsers", function(
        error,
        response
      ) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});

describe("Status and content - task", function() {
  describe("task page", function() {
    it("content /restApi/:userId/task GET", function(done) {
      chai
        .request("http://localhost:3001")
        .get("/restApi/111517098627972192986/task")
        .send({})
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("Array");
          done();
        });
    });
  });
});

describe("Status and content - viewTask", function() {
  describe("viewTask page", function() {
    it("content /restApi/:userId/task/:taskId GET", function(done) {
      chai
        .request("http://localhost:3001")
        .get("/restApi/111517098627972192986/task/5b8b8b2de4a82732402e7db8")
        .send({})
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          done();
        });
    });
  });
});

describe("Status and content - edit_task", function() {
  describe("edit_task page", function() {
    it("content /restApi/:userId/task/:taskId PUT", function(done) {
      chai
        .request("http://localhost:3001")
        .put("/restApi/111517098627972192986/task/5b8b8b2de4a82732402e7db8")
        .send({
          user_id: "111517098627972192986",
          title: "task 12",
          content: "task 12 - testing",
          date: "2018-05-05",
          complete: false
        })
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
