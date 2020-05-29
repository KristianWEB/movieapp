const { UserInputError, AuthenticationError } = require("apollo-server");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

const getAuthenticatedUser = require("../middlewares/authenticated");
const generateToken = require("../../util/generateToken");

module.exports = {
  Query: {
    loadAdmin: async (_, __, context) => {
      const { user, token } = await getAuthenticatedUser(context);
      if (!user) {
        throw new AuthenticationError("Unauthenticated!");
      }

      return {
        token,
        ...user._doc,
        id: user._id,
      };
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new UserInputError("Wrong email or password");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match || email !== user.email) {
        throw new UserInputError("Wrong email or password");
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    register: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (user) {
        throw new UserInputError("Email is taken");
      }

      const newUser = new User({
        email,
        password,
      });

      const savedUser = await newUser.add();

      const token = generateToken(newUser);
      return {
        ...savedUser._doc,
        id: savedUser._id,
        token,
      };
    },
  },
};
