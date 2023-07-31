import { ApolloServer } from "apollo-server-express";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/gql-resolvers";
import { verifyToken } from "./auth";
import { SurfSpotManagerrzContext } from "./context";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, "./schema.graphql");

const typeDefs = readFileSync(schemaPath, { encoding: "utf-8" });

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const server = new ApolloServer<SurfSpotManagerrzContext>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: async ({ req }) => {
    let authorization = req.headers.authorization || null;

    const user = await verifyToken(authorization);

    return {
      user,
    };
  },
});

const startApolloServer = async (app, httpServer) => {
  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer(app, httpServer);

export default httpServer;
