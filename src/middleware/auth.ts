import { User, UserModel } from "../database/models/user";
import jwtjson from "jsonwebtoken";
import { ResolverMiddleware } from "graphql-compose/lib/Resolver";
import { Request } from "express";
import { FlyDifferentContext } from "../server";

export const SECRET = "ThisIsASecret";
export const SALT_ROUNDS = 12;

export const getUserForToken = async (token?: string): Promise<User | null> => {
  if (!token) {
    return null;
  }
  // @ts-ignore
  const { username } = await jwtjson.decode(token!);
  return UserModel.findOne({ username });
};

export const extractToken = (req: Request) =>
  req.headers.authorization?.split(" ")[1];

export const extractTokenExpress = (request: Request) => {
  const authHeader = request.header("authorization");
  if (!authHeader) {
    throw Error("No authorization header sent");
  }

  return authHeader.replace("BEARER ", "");
};

export const verifyToken: ResolverMiddleware<any, FlyDifferentContext> = async (
  resolve,
  source,
  args,
  context,
  info
) => {
  const token = context.token;

  if (!token) {
    throw new Error("Unauthenticated");
  }

  let result;
  try {
    result = await jwtjson.verify(token, SECRET, { algorithms: ["HS256"] });
  } catch (ex) {
    console.error(ex);
    throw new Error("Unauthenticated");
  }

  if (result) {
    // @ts-ignore
    const username = result.username;

    return await resolve(
      source,
      args,
      {
        ...context,
        req: {
          ...context.req,
        },
        username,
      },
      info
    );
  }
};

export function signUser(user?: User): string | null {
  if (!user) {
    return null;
  }

  return jwtjson.sign(
    { _id: user._id, username: user.username, password: user.password },
    SECRET,
    { expiresIn: "24h" }
  );
}
