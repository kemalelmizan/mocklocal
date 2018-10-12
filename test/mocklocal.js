const mocklocal = require("../bin/mocklocal");

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;

chai.use(chaiHttp);
describe("mocklocal", () => {
  describe("/GET mocklocal", () => {
    it("it should return OK", done => {
      process.env.MIN_DELAY = "0";
      process.env.MAX_DELAY = "0";
      chai
        .request(mocklocal)
        .get("/test")
        .end((err, res) => {
          assert.equal(err, undefined)
          assert.equal(res.status, 200)
          assert.deepEqual(res.body, {})
          done();
        });
    });
  });
});
