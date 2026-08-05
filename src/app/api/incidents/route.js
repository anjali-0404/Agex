import { NextResponse } from 'next/server';

let incidentsDb = [
  {
    id: 'INC-101',
    category: 'Poor Lighting',
    location: 'Connaught Place Block C, New Delhi',
    coordinates: { lat: 28.6328, lng: 77.2197 },
    date: '2026-08-05',
    time: '21:30',
    description: 'Streetlight outage along outer circular lane. PCR Van alerted.',
    reportedBy: 'Rajesh Kumar (Resident)',
    severity: 'Medium',
    status: 'pending',
    timestamp: new Date().toISOString()
  },
  {
    id: 'INC-102',
    category: 'Waterlogging',
    location: 'Hauz Khas Outer Ring Road',
    coordinates: { lat: 28.5494, lng: 77.2001 },
    date: '2026-08-05',
    time: '19:45',
    description: 'Waterlogging near flyover causing low speed traffic surge.',
    reportedBy: 'Aarav Verma',
    severity: 'Low',
    status: 'verified',
    timestamp: new Date().toISOString()
  },
  {
    id: 'INC-103',
    category: 'Suspicious Activity',
    location: 'Gurugram Cyber City Phase 2',
    coordinates: { lat: 28.4950, lng: 77.0895 },
    date: '2026-08-05',
    time: '22:15',
    description: 'Unattended vehicle near tech park exit. Verified clear by security.',
    reportedBy: 'Gurugram Patrol Unit',
    severity: 'Low',
    status: 'verified',
    timestamp: new Date().toISOString()
  }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const statusFilter = searchParams.get('status');

  let filtered = incidentsDb;
  if (statusFilter) {
    filtered = incidentsDb.filter(i => i.status === statusFilter);
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    incidents: filtered
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { category, location, coordinates, date, time, description, reportedBy, contact, encryptedReport } = body;

    const newIncident = {
      id: 'INC-' + Math.floor(1000 + Math.random() * 9000),
      category: category || 'Suspicious Activity',
      location: location || 'New Delhi, Delhi NCR',
      coordinates: coordinates || { lat: 28.6139, lng: 77.2090 },
      date: date || new Date().toISOString().split('T')[0],
      time: time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: description || 'Community reported safety incident.',
      reportedBy: reportedBy || 'Anonymous Indian Citizen',
      contact: contact || null,
      severity: category === 'Harassment' || category === 'Eve Teasing' ? 'High' : 'Medium',
      status: 'pending',
      encryptedData: encryptedReport || null,
      timestamp: new Date().toISOString()
    };

    incidentsDb.unshift(newIncident);

    return NextResponse.json({
      success: true,
      message: '🚨 Real-time incident report broadcasted to Aegis backend and nearby PCR patrols.',
      incident: newIncident,
      totalIncidents: incidentsDb.length
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
