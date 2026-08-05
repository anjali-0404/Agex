import { NextResponse } from 'next/server';

let currentJourney = {
  id: 'jrn_live_901',
  active: true,
  destination: 'Home (Oak Street, Connaught Place)',
  etaMinutes: 14,
  progressPercent: 45,
  guardians: [
    { name: 'Mom (Primary Guardian)', status: 'Active Live Feed' },
    { name: 'Rohan (Emergency Contact)', status: 'Active Live Feed' }
  ],
  nextCheckInSec: 300,
  lastCheckInAt: new Date().toISOString()
};

export async function GET() {
  return NextResponse.json({ success: true, journey: currentJourney });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, destination } = body;

    if (action === 'checkin') {
      currentJourney.lastCheckInAt = new Date().toISOString();
      currentJourney.nextCheckInSec = 300;
      return NextResponse.json({
        success: true,
        message: '✅ Guardian Check-In Recorded. Timer Reset.',
        journey: currentJourney
      });
    }

    if (action === 'toggle') {
      currentJourney.active = !currentJourney.active;
      if (currentJourney.active) {
        currentJourney.progressPercent = 0;
        currentJourney.destination = destination || currentJourney.destination;
      }
      return NextResponse.json({
        success: true,
        message: currentJourney.active ? '🚀 Secure Journey Started.' : '🏁 Journey Ended.',
        journey: currentJourney
      });
    }

    return NextResponse.json({ success: true, journey: currentJourney });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
