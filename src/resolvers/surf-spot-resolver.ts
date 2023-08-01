import { Resolvers } from "../__generated__/resolvers-types.js";
import { authorize } from "../auth/index.js";
import { SurfSpotModel } from "../mongodb/models/SurfSpotModel.js";
import { UserModel } from "../mongodb/models/UserModel.js";

export const surfSpotResolver: Resolvers = {
  Query: {
    listSurfSpots: async (_, args, context, info) => {
      const userId = authorize(context);
      return SurfSpotModel.find({ userId });
    },
    getSurfSpot: async (_, { _id }, context) => {
      const userId = authorize(context);
      return SurfSpotModel.findOne({ _id, userId });
    },
  },
  Mutation: {
    createOrUpdateSurfSpot: async (_, { surfSpot }, context) => {
      const userId = authorize(context);
      const surfSpotDb = { ...surfSpot, userId };
      if (surfSpotDb._id) {
        return SurfSpotModel.findOneAndUpdate(
          { _id: surfSpot._id, userId },
          surfSpotDb,
          { new: true },
        );
      }
      return await new SurfSpotModel(surfSpotDb).save();
    },
    deleteSurfSpot: async (_, { _id }) => {
      return (await SurfSpotModel.findOneAndDelete({ _id }, { new: true }))._id;
    },
  },
  SurfSpot: {
    user: async (parent) => {
      return UserModel.findOne({ _id: parent.userId });
    },
  },
};
