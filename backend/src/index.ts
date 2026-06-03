import "./config/env.js";

import express, { Express } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import passport from "./config/passport.js";

// Route imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/questions.js";
import roomRoutes from "./routes/rooms.js";

// Socket handler import
import { gameHandler } from "./socket/gameHandler.js";

const app: Express = express();
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  },
});

// --------------- Global Middleware ---------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // Required for HTTP-only cookies
  })
);

// --------------- API Routes ---------------
app.get("/", (_req, res) => {
  res.json({ message: "Quiz API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/rooms", roomRoutes);

// --------------- Socket.io ---------------
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  gameHandler(io, socket);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// --------------- Start Server ---------------
const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Only start the server if not running in Vercel serverless environment
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  startServer();
}

export default app;
export { io };
