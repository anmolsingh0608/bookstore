const expect = require("chai").expect;
const { describe } = require("mocha");
const authMiddleware = require("../src/middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("This is auth middleware tests", () => {
  it("should throw an error if header is not present", () => {
    const req = {
      header: function () {
        return null;
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Token not present"
    );
  });

  it("should throw an error if auth token is just only one string", () => {
    const req = {
      header: function () {
        return "Bearer";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should throw an error if auth token is invalid", () => {
    const req = {
      header: function () {
        return "Bearer xyz";
      },
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Invalid Token"
    );
  });

  it("should yield a user id after token verification", () => {
    const req = {
      header: function () {
        return "Bearer xyz";
      },
    };

    sinon.stub(jwt, "verify");
    jwt.verify.returns({
      user: {},
    });

    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("user");

    jwt.verify.restore();
  });
});
