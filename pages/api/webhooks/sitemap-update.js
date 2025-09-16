/*
 * WordPress Webhook Handler for Sitemap Updates
 *
 * This endpoint is designed to be called by WordPress when content changes.
 * Configure a webhook in WordPress to POST to this URL after content is published,
 * updated, or deleted.
 *
 * Instructions for setting up webhooks in WordPress:
 * 1. Install the "WP Webhooks" plugin on your WordPress site
 * 2. Create a new webhook triggered on:
 *    - Post Published
 *    - Post Updated
 *    - Post Deleted
 *    - Page Published
 *    - Page Updated
 *    - Page Deleted
 * 3. Set the webhook URL to: https://yourdomain.com/api/webhooks/sitemap-update
 * 4. Set the authentication (if desired) with a secret header
 */

// Shared variable to track sitemap update status
let sitemapLastUpdated = null;
let isUpdating = false;

// Simple in-memory cache invalidation for sitemaps
export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  try {
    // Optional: Add authentication for the webhook
    // const secret = req.headers['x-webhook-secret'];
    // if (secret !== process.env.WEBHOOK_SECRET) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }

    // Prevent duplicate updates
    if (isUpdating) {
      return res.status(200).json({ 
        status: 'already_updating',
        message: 'Sitemap update already in progress',
        lastUpdated: sitemapLastUpdated
      });
    }

    // Set update status
    isUpdating = true;
    
    // Log webhook trigger details
    console.log('Sitemap update webhook triggered:', {
      time: new Date().toISOString(),
      data: req.body
    });

    // If webhook contains specific data about what changed, we could be more targeted
    // in what we update, but for simplicity we'll invalidate all sitemap caches

    // Clear any caches - we'll add these to the wordpress.js file
    if (typeof global.wpSitemapCache !== 'undefined') {
      console.log('Clearing WordPress sitemap cache due to webhook trigger');
      global.wpSitemapCache = new Map();
      global.wpSitemapCacheTime = new Map();
    }

    // Update timestamp
    sitemapLastUpdated = new Date().toISOString();
    isUpdating = false;
    
    // Return success response
    return res.status(200).json({
      status: 'success',
      message: 'Sitemap cache cleared successfully',
      updatedAt: sitemapLastUpdated
    });
  } catch (error) {
    console.error('Error in sitemap webhook handler:', error);
    isUpdating = false;
    return res.status(500).json({ error: 'Internal server error' });
  }
}