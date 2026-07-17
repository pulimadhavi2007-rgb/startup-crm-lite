import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import connectDB from "./config/database.js";

import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

// ======================================
// Load Environment Variables
// ======================================
dotenv.config();

// ======================================
// Validate Environment Variables
// ======================================
function checkRequiredEnvVars() {
  const required = [
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET",
    "FRONTEND_URL",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("======================================");
    console.error("❌ Missing Environment Variables");
    console.error(missing.join(", "));
    console.error("======================================");
    process.exit(1);
  }

  console.log("✅ Environment variables verified");
}

checkRequiredEnvVars();

// ======================================
// Connect Database
// ======================================
connectDB();

// ======================================
// Initialize Express
// ======================================
const app = express();

// ======================================
// Security Middleware
// ======================================

app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://your-app.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Body Parser
app.use(express.json({ limit: "10kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);

// ======================================
// Rate Limiting
// ======================================

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message:
      "Too many authentication attempts. Please try again later.",
  },
});

app.use("/api", generalLimiter);
app.use("/api/auth", authLimiter);

// ======================================
// Logging
// ======================================

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// ======================================
// Debug Middleware
// ======================================

if (process.env.NODE_ENV !== "production") {
  app.use((req, res, next) => {
    console.log("======================================");
    console.log(`${req.method} ${req.originalUrl}`);
    console.log("Body:", req.body);
    console.log("======================================");
    next();
  });
}

// ======================================
// Routes
// ======================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "Startup CRM Lite Backend",
    version: "DEBUG-V1",
    message: "🚀 Backend Running Successfully",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ======================================
// API Routes
// ======================================

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// ======================================
// Error Middleware
// ======================================

app.use(notFound);
app.use(errorHandler);

// ======================================
// Start Server
// ======================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("======================================");
  console.log("🚀 Startup CRM Lite Backend Started");
  console.log(`🌐 Server : http://localhost:${PORT}`);
  console.log(
    `🌍 Environment : ${process.env.NODE_ENV || "development"}`
  );
  console.log("======================================");
});

// ======================================
// Graceful Shutdown
// ======================================

const gracefulShutdown = (signal) => {
  console.log("\n======================================");
  console.log(`📴 Received ${signal}`);
  console.log("🔄 Server shutting down gracefully...");

  server.close(() => {
    console.log("✅ HTTP Server Closed");
    console.log("======================================");
    process.exit(0);
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));