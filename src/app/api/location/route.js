import { NextResponse } from 'next/server';

let activeStreams = {};

export async function POST(request) {
  try {
    const body = await request.json();
    const { trackingId, lat, lng, userId, userName, phone } = body;

    if (!trackingId) {
      return NextResponse.json({ success: false, error: 'Tracking ID required' }, { status: 400 });
    }

    activeStreams[trackingId] = {
      trackingId,
      lat: lat || 28.6139,
      lng: lng || 77.2090,
      userId: userId || 'usr_in_101',
      userName: userName || 'Ananya Sharma',
      phone: phone || '+91 98765 43210',
      lastUpdate: new Date().toISOString(),
      encrypted: true
    };

    return NextResponse.json({
      success: true,
      message: 'Live location stream updated on backend',
      stream: activeStreams[trackingId]
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get('track');

  if (trackId && activeStreams[trackId]) {
    return NextResponse.json({ success: true, stream: activeStreams[trackId] });
  }

  return NextResponse.json({ success: true, activeStreamsCount: Object.keys(activeStreams).length, streams: activeStreams });
}
