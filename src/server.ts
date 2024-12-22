import app from "./app";
import config from "./config/intex";
import { connectToMongoDb } from "./config/mongoDb";

(async () => {
  try {
    await connectToMongoDb(); // Connect to MongoDB
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
})();
