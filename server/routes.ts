import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {

  // Priority Content routes
  app.get("/api/priority-content", async (req, res) => {
    try {
      // Return all priority content without user filtering
      const contentItems = await storage.getAllPriorityContent();
      res.status(200).json(contentItems);
    } catch (error) {
      console.error("Error fetching priority content:", error);
      res.status(500).json({ message: "Error fetching priority content" });
    }
  });

  app.post("/api/priority-content", async (req, res) => {
    try {
      const newContent = await storage.createPriorityContent({
        ...req.body,
        userId: 1, // Default user ID for no-auth mode
      });
      res.status(201).json(newContent);
    } catch (error) {
      console.error("Error creating priority content:", error);
      res.status(500).json({ message: "Error creating priority content" });
    }
  });

  app.put("/api/priority-content/:id", async (req: any, res: any) => {
    try {
      const contentId = parseInt(req.params.id, 10);
      const content = await storage.getPriorityContentById(contentId);
      
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      const updatedContent = await storage.updatePriorityContent(contentId, req.body);
      res.status(200).json(updatedContent);
    } catch (error) {
      console.error("Error updating priority content:", error);
      res.status(500).json({ message: "Error updating priority content" });
    }
  });

  app.delete("/api/priority-content/:id", async (req: any, res: any) => {
    try {
      const contentId = parseInt(req.params.id, 10);
      const content = await storage.getPriorityContentById(contentId);
      
      if (!content) {
        return res.status(404).json({ message: "Content not found" });
      }
      
      await storage.deletePriorityContent(contentId);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting priority content:", error);
      res.status(500).json({ message: "Error deleting priority content" });
    }
  });

  // Links routes
  app.get("/api/links", async (req, res) => {
    try {
      const links = await storage.getAllLinks();
      res.status(200).json(links);
    } catch (error) {
      console.error("Error fetching links:", error);
      res.status(500).json({ message: "Error fetching links" });
    }
  });

  app.post("/api/links", async (req, res) => {
    try {
      const newLink = await storage.createLink({
        ...req.body,
        userId: 1, // Default user ID for no-auth mode
      });
      res.status(201).json(newLink);
    } catch (error) {
      console.error("Error creating link:", error);
      res.status(500).json({ message: "Error creating link" });
    }
  });

  // Domains routes
  app.get("/api/domains", async (req, res) => {
    try {
      const domains = await storage.getDomains();
      res.status(200).json(domains);
    } catch (error) {
      console.error("Error fetching domains:", error);
      res.status(500).json({ message: "Error fetching domains" });
    }
  });

  // Campaigns routes
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getAllCampaigns();
      res.status(200).json(campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ message: "Error fetching campaigns" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const newCampaign = await storage.createCampaign({
        ...req.body,
        userId: 1, // Default user ID for no-auth mode
      });
      res.status(201).json(newCampaign);
    } catch (error) {
      console.error("Error creating campaign:", error);
      res.status(500).json({ message: "Error creating campaign" });
    }
  });

  // Campaign domains routes
  app.post("/api/campaigns/:campaignId/domains", async (req: any, res: any) => {
    try {
      const campaignId = parseInt(req.params.campaignId, 10);
      const domainId = req.body.domainId;
      
      const campaign = await storage.getCampaignById(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      const campaignDomain = await storage.addDomainToCampaign({
        campaignId,
        domainId,
      });
      res.status(201).json(campaignDomain);
    } catch (error) {
      console.error("Error adding domain to campaign:", error);
      res.status(500).json({ message: "Error adding domain to campaign" });
    }
  });

  app.get("/api/campaigns/:campaignId/domains", async (req: any, res: any) => {
    try {
      const campaignId = parseInt(req.params.campaignId, 10);
      
      const campaign = await storage.getCampaignById(campaignId);
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
      
      const domains = await storage.getCampaignDomains(campaignId);
      res.status(200).json(domains);
    } catch (error) {
      console.error("Error fetching campaign domains:", error);
      res.status(500).json({ message: "Error fetching campaign domains" });
    }
  });

  // Booking request routes
  app.post("/api/booking", async (req, res) => {
    try {
      const bookingRequest = await storage.createBookingRequest({
        ...req.body,
        userId: undefined, // No user context in no-auth mode
      });
      res.status(201).json(bookingRequest);
    } catch (error) {
      console.error("Error creating booking request:", error);
      res.status(500).json({ message: "Error creating booking request" });
    }
  });

  // User settings routes - disabled in no-auth mode
  app.get("/api/user/settings", async (req, res) => {
    res.status(200).json({
      name: "Quick Access User",
      email: "user@example.com",
      username: "quickuser",
    });
  });

  app.put("/api/user/settings", async (req, res) => {
    // User settings disabled in no-auth mode
    res.status(200).json({
      name: "Quick Access User",
      email: "user@example.com", 
      username: "quickuser",
    });
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}