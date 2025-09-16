import { users, type User, type InsertUser, type BookingRequest, type InsertBookingRequest, bookingRequests, type PriorityContent, type InsertPriorityContent, priorityContent, type Link, type InsertLink, links, type Domain, type InsertDomain, domains, type Campaign, type InsertCampaign, campaigns, type CampaignDomain, type InsertCampaignDomain, campaignDomains } from "../shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;

  // Booking request methods
  createBookingRequest(insertBookingRequest: InsertBookingRequest): Promise<BookingRequest>;
  getBookingRequests(userId: number): Promise<BookingRequest[]>;
  getBookingRequestById(id: number): Promise<BookingRequest | undefined>;

  // Priority content methods
  createPriorityContent(insertPriorityContent: InsertPriorityContent): Promise<PriorityContent>;
  getPriorityContent(userId: number): Promise<PriorityContent[]>;
  getAllPriorityContent(): Promise<PriorityContent[]>;
  getPriorityContentById(id: number): Promise<PriorityContent | undefined>;
  updatePriorityContent(id: number, contentData: Partial<PriorityContent>): Promise<PriorityContent | undefined>;
  deletePriorityContent(id: number): Promise<boolean>;

  // Links methods
  createLink(insertLink: InsertLink): Promise<Link>;
  getLinks(userId: number): Promise<Link[]>;
  getAllLinks(): Promise<Link[]>;
  getLinkById(id: number): Promise<Link | undefined>;
  updateLink(id: number, linkData: Partial<Link>): Promise<Link | undefined>;
  deleteLink(id: number): Promise<boolean>;

  // Domains methods
  createDomain(insertDomain: InsertDomain): Promise<Domain>;
  getDomains(): Promise<Domain[]>;
  getDomainById(id: number): Promise<Domain | undefined>;
  updateDomain(id: number, domainData: Partial<Domain>): Promise<Domain | undefined>;
  deleteDomain(id: number): Promise<boolean>;

  // Campaigns methods
  createCampaign(insertCampaign: InsertCampaign): Promise<Campaign>;
  getCampaigns(userId: number): Promise<Campaign[]>;
  getAllCampaigns(): Promise<Campaign[]>;
  getCampaignById(id: number): Promise<Campaign | undefined>;
  updateCampaign(id: number, campaignData: Partial<Campaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: number): Promise<boolean>;

  // Campaign Domains methods
  addDomainToCampaign(insertCampaignDomain: InsertCampaignDomain): Promise<CampaignDomain>;
  removeDomainFromCampaign(campaignId: number, domainId: number): Promise<boolean>;
  getCampaignDomains(campaignId: number): Promise<Domain[]>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // No session store needed in no-auth mode
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Booking request methods
  async createBookingRequest(insertBookingRequest: InsertBookingRequest): Promise<BookingRequest> {
    const [bookingRequest] = await db.insert(bookingRequests).values(insertBookingRequest).returning();
    return bookingRequest;
  }

  async getBookingRequests(userId: number): Promise<BookingRequest[]> {
    return db.select().from(bookingRequests).where(eq(bookingRequests.userId, userId)).orderBy(desc(bookingRequests.createdAt));
  }

  async getBookingRequestById(id: number): Promise<BookingRequest | undefined> {
    const [bookingRequest] = await db.select().from(bookingRequests).where(eq(bookingRequests.id, id));
    return bookingRequest;
  }

  // Priority content methods
  async createPriorityContent(insertPriorityContent: InsertPriorityContent): Promise<PriorityContent> {
    const [content] = await db.insert(priorityContent).values(insertPriorityContent).returning();
    return content;
  }

  async getPriorityContent(userId: number): Promise<PriorityContent[]> {
    return db.select().from(priorityContent).where(eq(priorityContent.userId, userId));
  }

  async getAllPriorityContent(): Promise<PriorityContent[]> {
    return db.select().from(priorityContent).orderBy(desc(priorityContent.createdAt));
  }

  async getPriorityContentById(id: number): Promise<PriorityContent | undefined> {
    const [content] = await db.select().from(priorityContent).where(eq(priorityContent.id, id));
    return content;
  }

  async updatePriorityContent(id: number, contentData: Partial<PriorityContent>): Promise<PriorityContent | undefined> {
    const [content] = await db
      .update(priorityContent)
      .set({ ...contentData, updatedAt: new Date() })
      .where(eq(priorityContent.id, id))
      .returning();
    return content;
  }

  async deletePriorityContent(id: number): Promise<boolean> {
    const result = await db.delete(priorityContent).where(eq(priorityContent.id, id));
    return !!result;
  }

  // Links methods
  async createLink(insertLink: InsertLink): Promise<Link> {
    const [link] = await db.insert(links).values(insertLink).returning();
    return link;
  }

  async getLinks(userId: number): Promise<Link[]> {
    return db.select().from(links).where(eq(links.userId, userId)).orderBy(desc(links.date));
  }

  async getAllLinks(): Promise<Link[]> {
    return db.select().from(links).orderBy(desc(links.date));
  }

  async getLinkById(id: number): Promise<Link | undefined> {
    const [link] = await db.select().from(links).where(eq(links.id, id));
    return link;
  }

  async updateLink(id: number, linkData: Partial<Link>): Promise<Link | undefined> {
    const [link] = await db
      .update(links)
      .set({ ...linkData, updatedAt: new Date() })
      .where(eq(links.id, id))
      .returning();
    return link;
  }

  async deleteLink(id: number): Promise<boolean> {
    const result = await db.delete(links).where(eq(links.id, id));
    return !!result;
  }

  // Domains methods
  async createDomain(insertDomain: InsertDomain): Promise<Domain> {
    const [domain] = await db.insert(domains).values(insertDomain).returning();
    return domain;
  }

  async getDomains(): Promise<Domain[]> {
    return db.select().from(domains).orderBy(desc(domains.drScore));
  }

  async getDomainById(id: number): Promise<Domain | undefined> {
    const [domain] = await db.select().from(domains).where(eq(domains.id, id));
    return domain;
  }

  async updateDomain(id: number, domainData: Partial<Domain>): Promise<Domain | undefined> {
    const [domain] = await db
      .update(domains)
      .set({ ...domainData, updatedAt: new Date() })
      .where(eq(domains.id, id))
      .returning();
    return domain;
  }

  async deleteDomain(id: number): Promise<boolean> {
    const result = await db.delete(domains).where(eq(domains.id, id));
    return !!result;
  }

  // Campaigns methods
  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const [campaign] = await db.insert(campaigns).values(insertCampaign).returning();
    return campaign;
  }

  async getCampaigns(userId: number): Promise<Campaign[]> {
    return db.select().from(campaigns).where(eq(campaigns.userId, userId));
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
  }

  async getCampaignById(id: number): Promise<Campaign | undefined> {
    const [campaign] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    return campaign;
  }

  async updateCampaign(id: number, campaignData: Partial<Campaign>): Promise<Campaign | undefined> {
    const [campaign] = await db
      .update(campaigns)
      .set({ ...campaignData, updatedAt: new Date() })
      .where(eq(campaigns.id, id))
      .returning();
    return campaign;
  }

  async deleteCampaign(id: number): Promise<boolean> {
    const result = await db.delete(campaigns).where(eq(campaigns.id, id));
    return !!result;
  }

  // Campaign Domains methods
  async addDomainToCampaign(insertCampaignDomain: InsertCampaignDomain): Promise<CampaignDomain> {
    const [campaignDomain] = await db.insert(campaignDomains).values(insertCampaignDomain).returning();
    return campaignDomain;
  }

  async removeDomainFromCampaign(campaignId: number, domainId: number): Promise<boolean> {
    const result = await db
      .delete(campaignDomains)
      .where(eq(campaignDomains.campaignId, campaignId) && eq(campaignDomains.domainId, domainId));
    return !!result;
  }

  async getCampaignDomains(campaignId: number): Promise<Domain[]> {
    const campaignDomainData = await db
      .select({
        domain: domains,
      })
      .from(campaignDomains)
      .where(eq(campaignDomains.campaignId, campaignId))
      .innerJoin(domains, eq(campaignDomains.domainId, domains.id));

    return campaignDomainData.map((item) => item.domain);
  }
}

export const storage = new DatabaseStorage();