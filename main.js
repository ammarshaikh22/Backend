import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongodb_connection from "./src/db/db_connection.js";
import Authrouter from "./src/routes/auth.api.js";
import Adminrouter from "./src/routes/admin.api.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1',Authrouter)
app.use('/api/v2',Adminrouter)

app.get("/", (req, res) => {
  res.send("API is working.....");
});

const port = process.env.PORT || 7000;

mongodb_connection().then(
  app.listen(port, () => {
    console.log(`Server is running.... on ${port}`);
  }),
).catch((error) => {
  console.error(`Failed to connect to MongoDB: ${error.message}`);
});
