import express from 'express';
import crypto from 'crypto';
const router = express.Router();

const PIXEL_ID = '1465910951366925';
const ACCESS_TOKEN = 'EAAsD6GRGZADsBPYLLQhsdDGUSDgb2mGneISLUgN4ZA4CdxIVqhMk3E1fQslHBVZCJqgVVbTxGRAB97ehT3Q9hJQmdfmr2BDQbwMnTAQD7uuevfTOoxupdy9jytnjuPmgjPKVv5TwTUoVwX9bcdZCa2nlzRewFU0DDLvhNQWr6tCsCkkCbDqBFHTJWch81gI3sAZDZD';

// Hash function for user data
function hashData(data) {
    if (!data) return null;
    return crypto.createHash('sha256').update(data.toString().toLowerCase().trim()).digest('hex');
}

router.post("/fb-events", async (req, res) => {
    console.log(req.body);
    
    const { eventName, eventId, fbp, fbc, payload, userAgent, ip, referrer, timestamp, name, phone } = req.body;
    
    // Build user_data with hashed PII
    const user_data = { 
        client_ip_address: ip, 
        client_user_agent: userAgent, 
        fbp, 
        fbc 
    };
    
    // Hash the user data we actually collect
    if (phone) user_data.ph = hashData(phone);
    if (name) {
        const nameParts = name.split(' ');
        user_data.fn = hashData(nameParts[0]); // First name
        if (nameParts.length > 1) {
            user_data.ln = hashData(nameParts.slice(1).join(' ')); // Last name
        }
    }
    
    const event = {
        event_name: eventName,
        event_time: Math.floor(new Date(timestamp).getTime() / 1000),
        event_id: eventId,
        user_data,
        custom_data: payload,
        event_source_url: referrer,
        action_source: 'website'
    };

    try {
        const response = await fetch(
          `https://graph.facebook.com/v19.0/${PIXEL_ID}/events`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [event], access_token: ACCESS_TOKEN }),
          }
        );
        
        if (!response.ok) throw new Error('FB error ' + response.status);
        res.status(200).json({ status: 'ok' });
      } catch (err) {
        console.error('FB CAPI error:', err.message);
        res.status(500).json({ error: 'fb capi failed' });
      }
});

export default router;