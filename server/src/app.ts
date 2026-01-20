import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/UserRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  express.static(path.join(__dirname, "..", "..", "client", "build"))
);

app.use("/api/users", userRoutes);

app.get("/{*any}", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

export default app;
