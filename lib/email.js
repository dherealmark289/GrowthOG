import sgMail from '@sendgrid/mail';

// Set up SendGrid with the API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.warn('Missing SENDGRID_API_KEY environment variable');
}

/**
 * Send a magic link email using SendGrid
 * @param {string} to - Recipient email address
 * @param {string} magicLink - The magic link URL
 * @returns {Promise<boolean>} - True if sent successfully
 */
export const sendMagicLinkEmail = async (to, magicLink) => {
  try {
    const msg = {
      to,
      from: 'noreply@growthog.com', // Use your verified sender in SendGrid
      subject: 'Your GrowthOG Magic Link',
      text: `Click this link to sign in to your GrowthOG account: ${magicLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0F172A; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GrowthOG</h1>
          </div>
          <div style="padding: 30px; border: 1px solid #E5E7EB; border-top: none;">
            <h2 style="margin-top: 0;">Sign in to GrowthOG</h2>
            <p>Click the button below to securely sign in to your GrowthOG account. This link will expire in 24 hours.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${magicLink}" style="background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Sign in to GrowthOG</a>
            </div>
            <p style="color: #6B7280; font-size: 14px;">If you didn't request this email, please ignore it.</p>
            <p style="color: #6B7280; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #6B7280; font-size: 14px;">${magicLink}</p>
          </div>
          <div style="background-color: #F9FAFB; padding: 20px; text-align: center; font-size: 12px; color: #6B7280;">
            <p>&copy; ${new Date().getFullYear()} GrowthOG. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log('Magic link email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('Error sending magic link email:', error);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    return false;
  }
};

/**
 * Send a welcome email to new users
 * @param {string} to - Recipient email address
 * @param {string} name - User's name
 * @returns {Promise<boolean>} - True if sent successfully
 */
export const sendWelcomeEmail = async (to, name) => {
  try {
    const msg = {
      to,
      from: 'noreply@growthog.com', // Use your verified sender in SendGrid
      subject: 'Welcome to GrowthOG!',
      text: `Hi ${name}, Welcome to GrowthOG! We're excited to have you onboard.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0F172A; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GrowthOG</h1>
          </div>
          <div style="padding: 30px; border: 1px solid #E5E7EB; border-top: none;">
            <h2 style="margin-top: 0;">Welcome to GrowthOG!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for joining GrowthOG. We're thrilled to have you as part of our community.</p>
            <p>With GrowthOG, you can:</p>
            <ul>
              <li>Track your link building campaigns in real-time</li>
              <li>Analyze the impact of your backlinks on traffic and rankings</li>
              <li>Build campaigns tailored to your business goals</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://0ab136a5-8013-4e47-b993-a12a6a000e17-00-3uyxbl1rsqg4d.worf.replit.dev/dashboard" 
                 style="background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Go to Dashboard
              </a>
            </div>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br/>The GrowthOG Team</p>
          </div>
          <div style="background-color: #F9FAFB; padding: 20px; text-align: center; font-size: 12px; color: #6B7280;">
            <p>&copy; ${new Date().getFullYear()} GrowthOG. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log('Welcome email sent successfully to:', to);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    if (error.response) {
      console.error('SendGrid error details:', error.response.body);
    }
    return false;
  }
};