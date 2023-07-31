import app from "./index";
import { defaultSettings } from "./config/defaultSettings";
app.listen(defaultSettings.port, function () { return console.info("Server started"); });
