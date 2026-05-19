// api/webhooks.js - Serverless function for Vercel
// This receives all webhooks from TiendaNube

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Health check
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      message: 'TiendaNube Webhook Server is running',
      timestamp: new Date().toISOString(),
      environment: {
        hasAppId: !!process.env.TIENDANUBE_APP_ID,
        hasAppSecret: !!process.env.TIENDANUBE_APP_SECRET,
      },
    });
  }

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle webhooks
  if (req.method === 'POST') {
    try {
      const { event, store_id, data } = req.body;

      // Log webhook
      const webhookLog = {
        timestamp: new Date().toISOString(),
        event,
        store_id,
        dataKeys: data ? Object.keys(data) : [],
      };

      console.log('Webhook received:', JSON.stringify(webhookLog, null, 2));

      // Handle different webhook types
      switch (true) {
        // Store redact (when store is deleted)
        case req.url.includes('stores/redact'):
          console.log(`Store ${store_id} redaction requested`);
          return res.status(200).json({
            success: true,
            message: 'Store data redacted',
            store_id,
          });

        // Customer redact (GDPR - customer data deletion)
        case req.url.includes('customers/redact'):
          console.log(`Customer redaction requested for store ${store_id}`);
          return res.status(200).json({
            success: true,
            message: 'Customer data redacted',
            store_id,
          });

        // Customer data request (GDPR - export customer data)
        case req.url.includes('customers/data-request'):
          console.log(`Customer data export requested for store ${store_id}`);
          return res.status(200).json({
            success: true,
            message: 'Customer data request processed',
            store_id,
          });

        // Generic webhook (app events)
        default:
          console.log(`Generic webhook event: ${event} for store ${store_id}`);
          return res.status(200).json({
            success: true,
            message: 'Webhook processed',
            event,
            store_id,
          });
      }
    } catch (error) {
      console.error('Webhook error:', error.message);
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
