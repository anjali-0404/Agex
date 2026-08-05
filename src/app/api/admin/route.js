import { NextResponse } from 'next/server';

let adminBroadcasts = [];
let adminIncidents = [
  { id: 'INC-902', type: 'Suspicious Activity', location: 'Downtown Metro Station', reporter: 'User_442', status: 'pending', time: '10 mins ago' },
  { id: 'INC-901', type: 'Harassment', location: 'University Campus', reporter: 'User_891', status: 'verified', time: '1 hour ago' },
  { id: 'INC-899', type: 'Street Light Outage', location: 'Oak St. & 5th Ave', reporter: 'User_112', status: 'pending', time: '2 hours ago' }
];

export async function GET() {
  return NextResponse.json({
    success: true,
    systemStatus: 'Operational',
    activeUsersCount: 12450,
    activeSosCount: 2,
    incidents: adminIncidents,
    broadcasts: adminBroadcasts
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, incidentId, newStatus, message, targetArea } = body;

    if (action === 'moderate') {
      adminIncidents = adminIncidents.map(inc => {
        if (inc.id === incidentId) {
          return { ...inc, status: newStatus || 'verified' };
        }
        return inc;
      });
      return NextResponse.json({ success: true, message: `Incident ${incidentId} updated to ${newStatus}`, incidents: adminIncidents });
    }

    if (action === 'broadcast') {
      const broadcast = {
        id: 'brd_' + Date.now(),
        message: message || 'Emergency Alert Broadcast',
        targetArea: targetArea || 'All Active Users',
        sentAt: new Date().toISOString()
      };
      adminBroadcasts.unshift(broadcast);
      return NextResponse.json({
        success: true,
        message: '🚨 Emergency Broadcast Sent to All Active Aegis Users!',
        broadcast
      });
    }

    return NextResponse.json({ success: true, incidents: adminIncidents });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
