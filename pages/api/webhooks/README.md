# WordPress Webhook Integration

This folder contains API endpoints for WordPress integration, specifically for sitemap updates.

## Sitemap Update Webhook

When content is added, updated, or deleted in WordPress, the sitemap needs to be updated. This webhook endpoint provides an automated way to ensure your Next.js application's sitemap stays in sync with WordPress.

### Setup Instructions

1. **Install WP Webhooks Plugin**:
   - Log in to your WordPress admin dashboard
   - Go to Plugins > Add New
   - Search for "WP Webhooks"
   - Install and activate the plugin

2. **Configure the Webhook**:
   - In WordPress, go to WP Webhooks > Webhooks
   - Click "Add Webhook"
   - Set the following configuration:
     - Name: "Sitemap Update"
     - Webhook URL: `https://your-nextjs-app.com/api/webhooks/sitemap-update`
     - HTTP Method: POST
     - Content-Type: application/json

3. **Set Triggers**:
   Configure the webhook to trigger on these events:
   - Post published
   - Post updated
   - Post deleted
   - Page published
   - Page updated
   - Page deleted

4. **Optional: Add Authentication**:
   For better security, add a secret token:
   - In Next.js, set an environment variable: `WEBHOOK_SECRET=your-secret-token`
   - In WordPress webhook settings, add a custom header:
     - Name: `x-webhook-secret`
     - Value: `your-secret-token`
   - Uncomment the authentication code in the webhook handler

## How It Works

When WordPress triggers the webhook:

1. The endpoint clears the sitemap cache stored in memory
2. Next time a user visits your sitemap, fresh data is fetched from WordPress
3. The sitemap is automatically updated with any new content

## Testing

You can test the webhook by:

1. Creating a new post in WordPress
2. Checking your application's sitemap to verify the new content appears
3. Viewing the Next.js logs to see when the webhook is triggered

## Troubleshooting

If the webhook isn't working:

1. Check WordPress logs to ensure the webhook is being triggered
2. Check your application logs for any errors in the webhook handler
3. Verify the webhook URL is accessible from the WordPress server
4. Try manually clearing the cache by visiting: `/api/webhooks/sitemap-update`