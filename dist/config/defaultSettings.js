import * as dotenv from "dotenv";
import * as process from "process";
dotenv.config({ path: ".env.local" });
export var defaultSettings = {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
    mongoUrl: process.env.MONGO_URL,
    mongoDatabase: process.env.MONGODB_APPLICATION_DATABASE,
    mongoUsername: process.env.MONGO_INITDB_ROOT_USERNAME,
    mongoPassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
};
