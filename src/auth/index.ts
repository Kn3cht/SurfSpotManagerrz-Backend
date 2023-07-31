import { DBUser, UserModel } from "../mongodb/models/UserModel";
import jwtjson from "jsonwebtoken";
import { defaultSettings } from "../config/defaultSettings";
import { User } from "../__generated__/resolvers-types";
import { SurfSpotManagerrzContext } from "../context";
import { GraphQLError } from "graphql/error";

const JWT_SECRET = defaultSettings.jwtSecret;
export const signUser = (user: DBUser) =>
  jwtjson.sign(
    { _id: user._id, username: user.username, password: user.password },
    JWT_SECRET,
    { expiresIn: "24h" },
  );

export const verifyToken = async (
  authorization: string | null,
): Promise<User | null> => {
  if (!authorization) {
    return null;
  }

  const tokenParts = authorization.split(" ");
  if (tokenParts.length !== 2) {
    throw new Error("Invalid authorization format");
  }
  const token = tokenParts[1];

  let tokenContent;
  try {
    tokenContent = await jwtjson.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
  } catch (ex) {
    console.error(ex);
    throw new Error("Unauthenticated");
  }

  return UserModel.findOne({ _id: tokenContent._id });
};

export const authorize = (context: SurfSpotManagerrzContext): string => {
  if (!context.user) {
    throw new GraphQLError("You are not authorized to perform this action.", {
      extensions: {
        code: "FORBIDDEN",
      },
    });
  }
  return context.user._id;
};
