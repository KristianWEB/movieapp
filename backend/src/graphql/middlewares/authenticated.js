const jwt = require("jsonwebtoken");
const generateToken = require("../../util/generateToken");
const User = require("../../models/User");

const secret = "YOURSECRET";

module.exports = context => {
  const authHeader = context.req.headers.authorization;
  let user = null;
  let token = null;
  if (authHeader) {
    token = authHeader.split("Bearer ")[1];
    user = jwt.verify(token, secret);
  }
  return {
    token,
    user,
  };
};
