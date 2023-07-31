import { Resolvers } from "../__generated__/resolvers-types";
import lodash from "lodash";
import { surfSpotResolver } from "./surf-spot-resolver.js";
import { GraphQLScalarType } from "graphql";
import { userResolvers } from "./user-resolvers.js";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  parseValue(value: string) {
    return new Date(value);
  },
  serialize(value: Date) {
    return value.toISOString();
  },
});

const scalarResolvers: Resolvers = {
  Date: dateScalar,
};

export const resolvers: Resolvers = lodash.merge(
  scalarResolvers,
  userResolvers,
  surfSpotResolver,
);
