import { ApolloServer } from "apollo-server-express";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/gql-resolvers.js";
import { verifyToken } from "./auth/index.js";
import { SurfSpotManagerrzContext } from "./context.js";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { connectDB } from "./mongodb";

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
  persistedQueries: false,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: async ({ req }) => {
    let authorization = req.headers.authorization || null;

    const user = await verifyToken(authorization);

    return {
      user,
    };
  },
});

const startApolloServer = async (app: express.Application) => {
  connectDB();
  await server.start();
  console.log("🚀 Apollo Server Started");
  server.applyMiddleware({ app });
};

startApolloServer(app);

export default httpServer;
