import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/UserRoutes";
import authRoutes from "./routes/AuthRoutes"
import { Socket } from "net";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// // Ajout sockets

// const server = require('http').Server(app)
// const io = require('socket.io')(server)

// io.on('connection', (socket: any) =>{   
//   console.log(`Connecté au client ${socket.id}`)
// })

app.use(
  express.static(path.join(__dirname, "..", "..", "client", "build"))
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes)

app.get("/{*any}", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "build", "index.html")
  );
});

export default app;


