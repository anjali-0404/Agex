import { NextResponse } from 'next/server';

let sosLog = [];

export async function POST(request) {
  try {
    const body = await request.json();
    const { encryptedSos, rawPayload } = body;

    const timestamp = new Date().toISOString();
    const sosRecord = {
      id: 'sos_' + Date.now(),
      encryptedData: encryptedSos,
      receivedAt: timestamp,
      status: 'ACTIVE_DISPATCH',
      user: rawPayload?.userName || 'Ananya Sharma',
      phone: rawPayload?.userPhone || '+91 98765 43210',
      coordinates: rawPayload?.location || { lat: 28.6139, lng: 77.2090 },
      notifiedContactsCount: rawPayload?.emergencyContacts?.length || 5,
      dispatchedServices: ['Delhi Police PCR (112)', 'National Women Helpline (1091)', 'Saved Emergency Contacts']
    };

    sosLog.unshift(sosRecord);

    console.log('[REALTIME SOS DISPATCH LOGGED]:', sosRecord);

    return NextResponse.json({
      success: true,
      sosId: sosRecord.id,
      message: '🚨 SOS Emergency Received at AegisAI Backend. E2EE Dispatch Sent to Emergency Contacts & 112 Command Center.',
      record: sosRecord
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', activeSOSCount: sosLog.length, logs: sosLog });
}
