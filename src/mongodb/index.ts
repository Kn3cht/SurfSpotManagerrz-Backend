import { connect } from "mongoose";
import { defaultSettings } from "../config/defaultSettings";

const mongoUrl = `mongodb+srv://${defaultSettings.mongoUrl}`;

export const connectDB = async () => {
  return connect(mongoUrl, {
    user: defaultSettings.mongoUsername,
    pass: defaultSettings.mongoPassword,
    dbName: defaultSettings.mongoDatabase,
  })
    .then(() => console.log(`🍃 Connected to mongo running on: ${mongoUrl}`))
    .catch((error) => console.error(error));
};
