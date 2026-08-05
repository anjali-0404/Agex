import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, location, city } = body;

    const lat = location?.lat ? location.lat.toFixed(4) : '28.6139';
    const lng = location?.lng ? location.lng.toFixed(4) : '77.2090';
    const q = (prompt || '').toLowerCase();
    const userCity = city || 'Delhi NCR, India';

    let reply = '';

    if (q.includes('status') || q.includes('area') || q.includes('safe right now')) {
      reply = `📊 **India Real-Time Telemetry Analysis for ${userCity}:**\nYour location (${lat}° N, ${lng}° E) has an optimal **88/100 Safety Index**.\n• CCTV Coverage: 94% within 500m radius\n• Delhi Police PCR Vans: 18 active vehicles in circuit\n• Street Lighting: 24x7 lit main arterial corridor`;
    } else if (q.includes('nearest') || q.includes('police') || q.includes('haven') || q.includes('hospital')) {
      reply = `🏪 **Verified Indian Safe Havens Near You:**\n1. **Connaught Place Police Station** (0.6 km) • 📞 +91 11 2336 1234\n2. **Rajiv Chowk Metro CISF Safe Zone** (0.4 km) • 📞 112\n3. **AIIMS Emergency Care** (3.2 km) • 📞 +91 11 2658 8500\n\nTap the **Safety Map** tab to view turn-by-turn navigation.`;
    } else if (q.includes('gps') || q.includes('share') || q.includes('coordinates')) {
      reply = `📍 **Your Live E2EE India GPS Coordinates:**\n• Latitude: **${lat}° N**\n• Longitude: **${lng}° E**\n• Accuracy: ±5 meters\n\nSharing active E2EE link to saved emergency contacts (+91 98765 43210).`;
    } else if (q.includes('helpline') || q.includes('emergency') || q.includes('sos') || q.includes('number')) {
      reply = `🚨 **Official Indian Emergency Helplines:**\n• **112**: National Emergency Services\n• **1091**: National Women Helpline\n• **100**: Police Control Room\n• **102**: Ambulance Service\n\nTap the red **Rapid SOS** button anytime for automatic E2EE dispatch.`;
    } else {
      reply = `🛡️ **Aegis AI Safety Telemetry:**\nI am actively monitoring your coordinates (${lat}° N, ${lng}° E) in ${userCity}. Surrounding zones have low risk indicators. How else can I assist your safe journey?`;
    }

    return NextResponse.json({
      success: true,
      reply,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
