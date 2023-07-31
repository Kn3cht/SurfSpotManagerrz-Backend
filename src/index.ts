import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/gql-resolvers";
import { connectDB } from "./mongodb";
import { verifyToken } from "./auth";
import { SurfSpotManagerrzContext } from "./context";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, "./schema.graphql");

const typeDefs = readFileSync(schemaPath, { encoding: "utf-8" });

const server = new ApolloServer<SurfSpotManagerrzContext>({
  typeDefs,
  resolvers,
});

await connectDB();

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000, path: "/graphql" },
  context: async ({ req }) => {
    let authorization = req.headers.authorization || null;

    const user = await verifyToken(authorization);

    return {
      user,
    };
  },
});
console.log(`🚀  Server ready at: ${url}graphql`);

export default server;
