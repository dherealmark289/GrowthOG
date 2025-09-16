import { Express } from "express";

// Auth disabled - no-op function
export function setupAuth(app: Express) {
  // Auth disabled - all routes return empty responses or default data
  app.post("/api/register", async (req, res) => {
    res.status(200).json({ message: "Auth disabled" });
  });

  app.post("/api/login", async (req, res) => {
    res.status(200).json({ message: "Auth disabled" });
  });

  app.post("/api/logout", async (req, res) => {
    res.status(200).json({ message: "Auth disabled" });
  });

  app.get("/api/user", (req, res) => {
    res.status(200).json({
      user: {
        id: 1,
        username: "quickuser",
        email: "user@example.com",
        name: "Quick Access User",
      },
    });
  });

  app.post("/api/auth/magic-link", async (req, res) => {
    res.status(200).json({ 
      user: { id: 1, username: "quickuser", email: "user@example.com", name: "Quick Access User" },
      message: "Auth disabled - quick access mode",
    });
  });
}