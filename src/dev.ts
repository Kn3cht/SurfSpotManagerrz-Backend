import app from "./index";
import { defaultSettings } from "./config/defaultSettings";

app.listen(defaultSettings.port, () => console.info("Server started"));
