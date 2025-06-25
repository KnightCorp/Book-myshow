import dotenv from "dotenv";
dotenv.config(); // Loads .env locally

import express from "express";
import routes from "./src/routes/index.js";
import connectDB from "./src/helpers/mongoose.js";

const app = express();

try {
  await connectDB(); // Ensure MongoDB connects before starting
} catch (err) {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

const port = process.env.PORT || 8080;
const address = process.env.SERVER_ADDRESS || "localhost";

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Server running on http://${address}:${port}`)
);

export default app;
