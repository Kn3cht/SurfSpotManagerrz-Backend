import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config({ path: ".env.local" });

interface DefaultSettingsI {
  port: number | undefined;

  mongoUrl: string;
  mongoDatabase: string;
  mongoUsername: string;
  mongoPassword: string;

  jwtSecret: string;
  cookieSecret: string;
  authEnabled: boolean;
}

export const defaultSettings: DefaultSettingsI = {
  port: process.env.PORT ? Number(process.env.PORT) : undefined,

  mongoUrl: process.env.MONGO_URL!,
  mongoDatabase: process.env.MONGODB_APPLICATION_DATABASE!,
  mongoUsername: process.env.MONGO_INITDB_ROOT_USERNAME!,
  mongoPassword: process.env.MONGO_INITDB_ROOT_PASSWORD!,

  jwtSecret: process.env.JWT_SECRET!,
  cookieSecret: process.env.COOKIE_SECRET!,
  authEnabled: process.env.AUTH_ENABLED === "true",
};
