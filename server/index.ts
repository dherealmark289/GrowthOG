import express from "express";
import next from "next";
import { registerRoutes } from "./routes";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = Number(process.env.PORT) || 5000;

app.prepare().then(() => {
  const server = express();
  
  // Parse JSON request bodies
  server.use(express.json());
  
  // Register API routes
  const httpServer = registerRoutes(server);

  // Handle all other requests with Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  httpServer.listen(PORT, () => {
    console.log(`> Server listening at http://localhost:${PORT}`);
  });
});