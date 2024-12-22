import express from "express";
import { notFoundHandler } from "./middleware/notFoundMiddleware";
import { errorHandler } from "./middleware/errorMiddleware";
import configs from "./config/intex";
import morgan from "morgan";
import routes from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

if (configs.NODE_ENV === "development") {
  app.use(morgan("dev")); // Detailed logging for development
}

app.use("/api/v1", routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
