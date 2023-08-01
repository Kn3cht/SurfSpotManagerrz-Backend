import lodash from "lodash";
import { surfSpotResolver } from "./surf-spot-resolver.js";
import { GraphQLScalarType } from "graphql";
import { userResolvers } from "./user-resolvers.js";
var dateScalar = new GraphQLScalarType({
    name: "Date",
    parseValue: function (value) {
        return new Date(value);
    },
    serialize: function (value) {
        return value.toISOString();
    },
});
var scalarResolvers = {
    Date: dateScalar,
};
export var resolvers = lodash.merge(scalarResolvers, userResolvers, surfSpotResolver);
