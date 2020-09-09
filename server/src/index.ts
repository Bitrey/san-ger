import express from "express";
export const app = express();

import routes from "./routes";
import logger from "./logger";
import path from "path";

// Use routes
app.use("/", routes);

// Set frontend
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));
app.use(express.static(path.join(process.cwd(), "public")));

const PORT = Number(process.env.PORT) || 3000;
const IP = process.env.IP || "127.0.0.1";

// Start server
app.listen(PORT, IP, () => logger.info("Server started on port " + PORT));
