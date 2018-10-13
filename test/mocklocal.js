const mocklocal = require("../bin/mocklocal");

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;

chai.use(chaiHttp);
describe("mocklocal", () => {
  describe("/GET mocklocal", () => {
    it("should return http 200", done => {
      process.env.PORT = "3000";
      process.env.MIN_DELAY = "0";
      process.env.MAX_DELAY = "0";
      process.env.RESPONSE = "req";
      chai
        .request(mocklocal)
        .get("/test")
        .end((err, res) => {
          assert.equal(err, undefined);
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {});
          done();
        });
    });
    it("should not have application/json header in response", done => {
      process.env.PORT = "3000";
      process.env.MIN_DELAY = "0";
      process.env.MAX_DELAY = "0";
      // Invalid json example
      process.env.RESPONSE = "{";
      chai
        .request(mocklocal)
        .get("/test")
        .end((err, res) => {
          assert.equal(err, undefined);
          assert.equal(res.status, 200);
          assert.notEqual("application/json", res.header['content-type'])
          assert.deepEqual(res.body, {});
          done();
        });
    });
    it("should respond with request", done => {
      process.env.PORT = "3000";
      process.env.MIN_DELAY = "0";
      process.env.MAX_DELAY = "0";
      process.env.RESPONSE = "req";
      chai
        .request(mocklocal)
        .post("/test")
        .set("content-type", "application/json")
        .send({ param1: "test" })
        .end((err, res) => {
          assert.equal(err, undefined);
          assert.equal(res.status, 200);
          assert.equal("application/json; charset=utf-8", res.header['content-type'])
          assert.deepEqual(res.body, { param1: "test" });
          done();
        });
    });
  });
});
