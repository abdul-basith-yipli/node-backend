import dotenv from "dotenv";

dotenv.config();

const configs = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URI: process.env.MONGO_URI || "",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "access_token_secret",
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret",
  JWT_ACCESS_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "15m",
  JWT_REFRESH_EXPIRATION_TIME: process.env.JWT_REFRESH_EXPIRATION_TIME || "7d",
};

export default configs;
