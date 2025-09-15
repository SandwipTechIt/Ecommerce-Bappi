import axios from 'axios';

// const API_URL = "https://api.comfortyzone.com"; 
const API_URL = "http://192.168.0.200:3000"; 

function getFbCookies() {
  const get = (name) =>
    document.cookie
      .split('; ')
      .find((r) => r.startsWith(`${name}=`))
      ?.split('=')[1];
  return {
    fbp: get('_fbp') || null,
    fbc: get('_fbc') || null,
  };
}

export async function sendServerEvent(eventName, payload = {}, userData = {}) {
    const eventId = 'event_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  
    // Get Facebook cookies
    const { fbp, fbc } = getFbCookies();
    
    // Get user IP
    const { data: ipData } = await axios.get('https://api.ipify.org?format=json');
    
    // Send only the data we actually collect
    const eventData = {
      eventName,
      eventId,
      fbp,
      fbc,
      payload,
      userAgent: navigator.userAgent,
      ip: ipData.ip,
      referrer: document.referrer,
      timestamp: new Date().toISOString(),
      // Only send name and phone (what we actually collect)
      name: userData.name || null,
      phone: userData.phone || null
    };

    try {
      // Send to server for Conversions API
      await axios.post(`${API_URL}/fb-events`, eventData);
    } catch (error) {
      console.error('Server event failed:', error);
      // Continue with client-side tracking as fallback
    }
  
    // Fire browser pixel with same event ID for deduplication
    if (window.fbq) {
      window.fbq('track', eventName, payload, { eventID: eventId });
    }
}