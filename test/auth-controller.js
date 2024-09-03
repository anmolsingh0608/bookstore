const expect = require("chai").expect;
const { describe } = require("mocha");
const sinon = require("sinon");
const User = require("../src/models/User");
const { login } = require("../src/controllers/authController");

describe("Auth controller", function () {
  it("should throw an error if user not found in database", (done) => {
    sinon.stub(User, "findOne");
    User.findOne.returns(null);

    const req = {
      body: {
        email: "",
        password: "",
      },
    };

    login(req, {}, (err) => {
      throw err;
    }).catch((err) => {
      expect(err).to.be.an("error");
      expect(err).to.have.property("message", "Invalid email");
      done();
    });

    User.findOne.restore();
  });
});
