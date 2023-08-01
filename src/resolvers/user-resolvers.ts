import { Resolvers } from "../__generated__/resolvers-types.js";
import { UserModel } from "../mongodb/models/UserModel.js";
import bcrypt from "bcrypt";
import { authorize, signUser } from "../auth/index.js";
import { SurfSpotModel } from "../mongodb/models/SurfSpotModel.js";

export const SALT_ROUNDS = 12;

export const userResolvers: Resolvers = {
  Query: {
    findCurrentUser: async (_, args, { user }, info) => {
      return user;
    },
  },
  Mutation: {
    createAccount: async (_, { email, password, username }, context, info) => {
      if (await UserModel.findOne({ email })) {
        throw new Error("E-Mail already in use");
      }

      const salt = bcrypt.genSaltSync(SALT_ROUNDS);
      const passwordHash = bcrypt.hashSync(password, salt);

      const user = await new UserModel({
        email,
        password: passwordHash,
        username,
      }).save();

      const token = signUser(user);
      return { user, token };
    },
    login: async (_, { email, password }) => {
      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        throw new Error("Wrong credentials");
      }

      const authenticated = bcrypt.compareSync(password, user.password);
      if (!authenticated) {
        throw new Error("Wrong credentials");
      }
      return signUser(user);
    },
    deleteAccount: async (_, __, context) => {
      const userId = authorize(context);
      await UserModel.findOneAndDelete({ _id: userId });
      await SurfSpotModel.deleteMany({ userId });
      return userId;
    },
  },
};
