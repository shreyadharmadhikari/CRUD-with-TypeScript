import express from "express";
import { connect } from "./db";
import bookRouter from "./routes/bookRoutes";

const app = express();
const PORT = 4000;

app.use(express.json()); // for parsing application/json
app.use("/", bookRouter);

if (process.env.NODE_ENV !== "test") {
  connect()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to connect to the database", error);
    });
}

export { app };
