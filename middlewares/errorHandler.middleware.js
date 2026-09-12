import fs from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "logs", "errors.log");

const ensureLogsDir = () => {
  const dir = path.dirname(logFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const errorHandler = (err, req, res, next) => {
  ensureLogsDir();

  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${err.message}\n${err.stack || ""}\n\n`;

  fs.appendFile(logFilePath, logEntry, (fsErr) => {
    if (fsErr) console.error("Failed to write error log:", fsErr);
  });

  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Validation error",
      details: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  res.status(500).json({ error: "Something went wrong" });
};