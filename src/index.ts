import { ApolloServer } from "apollo-server-express";
import * as path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/gql-resolvers";
import { connectDB } from "./mongodb";
import { verifyToken } from "./auth";
import { SurfSpotManagerrzContext } from "./context";

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { defaultSettings } from "./config/defaultSettings";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.resolve(__dirname, "./schema.graphql");

const typeDefs = readFileSync(schemaPath, { encoding: "utf-8" });

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

const server = new ApolloServer<SurfSpotManagerrzContext>({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authorization = req.headers.authorization || null;

    const user = await verifyToken(authorization);

    return {
      user,
    };
  },
});

await connectDB();

await server.start();

server.applyMiddleware({
  app,
  cors: false,
});

const PORT = defaultSettings.port;
httpServer
  .listen(PORT, () =>
    console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`),
  )
  .on("close", () => httpServer.close());

export default server;
