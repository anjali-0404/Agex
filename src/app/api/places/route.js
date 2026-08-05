import { NextResponse } from 'next/server';

let placesDb = [
  // New Delhi & NCR
  { id: 1, name: 'Connaught Place Police Precinct', city: 'New Delhi', type: 'police', distance: '0.6 km', score: 99, address: 'Block B, Connaught Place, New Delhi', phone: '+91 11 2336 1234', hours: 'Open 24/7', verified: true },
  { id: 2, name: 'Rajiv Chowk CISF Safe Haven', city: 'New Delhi', type: 'metro', distance: '0.4 km', score: 98, address: 'Rajiv Chowk Metro Gate 5, Delhi NCR', phone: '112', hours: 'Open 24/7', verified: true },
  { id: 3, name: 'AIIMS Trauma & Emergency Center', city: 'New Delhi', type: 'hospital', distance: '3.2 km', score: 96, address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi', phone: '+91 11 2658 8500', hours: 'Open 24/7', verified: true },
  { id: 4, name: 'Indian Oil 24/7 Lit Station & Mart', city: 'New Delhi', type: 'fuel', distance: '1.1 km', score: 91, address: 'Janpath Road Corner, New Delhi', phone: '+91 98765 43210', hours: 'Open 24/7', verified: true },
  
  // Gurugram / Gurgaon
  { id: 5, name: 'Gurugram Cyber City Police Control Post', city: 'Gurugram', type: 'police', distance: '0.8 km', score: 97, address: 'DLF Cyber City Phase 2, Gurugram', phone: '+91 124 2316 100', hours: 'Open 24/7', verified: true },
  { id: 6, name: 'Fortis Memorial Research Institute', city: 'Gurugram', type: 'hospital', distance: '2.1 km', score: 98, address: 'Sector 44, Opp. HUDA City Centre, Gurugram', phone: '+91 124 4962 200', hours: 'Open 24/7', verified: true },
  { id: 7, name: 'HUDA City Centre Metro CISF Post', city: 'Gurugram', type: 'metro', distance: '1.2 km', score: 96, address: 'HUDA City Centre Metro Station, Gurugram', phone: '112', hours: 'Open 24/7', verified: true },

  // Mumbai
  { id: 8, name: 'Marine Drive Police Assistance Post', city: 'Mumbai', type: 'police', distance: '0.5 km', score: 99, address: 'Marine Drive Promenade, Churchgate, Mumbai', phone: '+91 22 2204 2000', hours: 'Open 24/7', verified: true },
  { id: 9, name: 'Bandra Kurla Complex (BKC) Security Hub', city: 'Mumbai', type: 'police', distance: '1.4 km', score: 97, address: 'G Block, Bandra Kurla Complex, Mumbai', phone: '+91 22 2650 1100', hours: 'Open 24/7', verified: true },
  { id: 10, name: 'Lilavati Hospital & Research Centre', city: 'Mumbai', type: 'hospital', distance: '2.1 km', score: 98, address: 'A-791, Bandra Reclamation, Bandra West, Mumbai', phone: '+91 22 2675 1000', hours: 'Open 24/7', verified: true },
  { id: 11, name: 'CSMT Railway CISF Safe Station', city: 'Mumbai', type: 'metro', distance: '0.9 km', score: 96, address: 'Chhatrapati Shivaji Maharaj Terminus, Mumbai', phone: '112', hours: 'Open 24/7', verified: true },
  { id: 12, name: 'Juhu Circle HP 24/7 Retail Haven', city: 'Mumbai', type: 'fuel', distance: '1.5 km', score: 92, address: 'Juhu Tara Road, Juhu, Mumbai', phone: '+91 98200 12345', hours: 'Open 24/7', verified: true },

  // Bengaluru
  { id: 13, name: 'MG Road Metro Exchange CISF Haven', city: 'Bengaluru', type: 'metro', distance: '0.4 km', score: 98, address: 'MG Road Metro Station Exit 2, Bengaluru', phone: '+91 80 2294 2222', hours: 'Open 24/7', verified: true },
  { id: 14, name: 'Indiranagar 100ft Rd Police Assistance Post', city: 'Bengaluru', type: 'police', distance: '0.7 km', score: 96, address: '100 Feet Road, Indiranagar, Bengaluru', phone: '+91 80 2294 2520', hours: 'Open 24/7', verified: true },
  { id: 15, name: 'Manipal Hospital 24/7 Trauma Unit', city: 'Bengaluru', type: 'hospital', distance: '2.8 km', score: 97, address: '98 HAL Old Airport Rd, Kodihalli, Bengaluru', phone: '+91 80 2502 4444', hours: 'Open 24/7', verified: true },
  { id: 16, name: 'Koramangala 80ft Rd Shell 24/7 Haven', city: 'Bengaluru', type: 'fuel', distance: '1.2 km', score: 93, address: '80 Feet Road, 4th Block, Koramangala, Bengaluru', phone: '+91 98450 99887', hours: 'Open 24/7', verified: true },

  // Hyderabad
  { id: 17, name: 'HITECH City Cyberabad Police Precinct', city: 'Hyderabad', type: 'police', distance: '0.6 km', score: 98, address: 'Mindspace Road, HITECH City, Hyderabad', phone: '+91 40 2785 3412', hours: 'Open 24/7', verified: true },
  { id: 18, name: 'Apollo Hospitals Emergency Center', city: 'Hyderabad', type: 'hospital', distance: '2.3 km', score: 97, address: 'Road No 72, Jubilee Hills, Hyderabad', phone: '+91 40 2360 7777', hours: 'Open 24/7', verified: true },
  { id: 19, name: 'Gachibowli Metro CISF Safe Zone', city: 'Hyderabad', type: 'metro', distance: '1.5 km', score: 94, address: 'Gachibowli Junction, Hyderabad', phone: '112', hours: 'Open 24/7', verified: true },

  // Pune
  { id: 20, name: 'Vimannagar Police Precinct & Patrol', city: 'Pune', type: 'police', distance: '0.8 km', score: 97, address: 'Viman Nagar Main Road, Pune', phone: '+91 20 2663 1100', hours: 'Open 24/7', verified: true },
  { id: 21, name: 'Ruby Hall Clinic Emergency Ward', city: 'Pune', type: 'hospital', distance: '2.5 km', score: 96, address: 'Sassoon Road, Pune', phone: '+91 20 6645 5100', hours: 'Open 24/7', verified: true },

  // Chennai
  { id: 22, name: 'Anna Salai Police Control Station', city: 'Chennai', type: 'police', distance: '0.5 km', score: 98, address: 'Mount Road, Anna Salai, Chennai', phone: '+91 44 2345 2350', hours: 'Open 24/7', verified: true },
  { id: 23, name: 'Apollo Hospitals Greams Road Emergency', city: 'Chennai', type: 'hospital', distance: '1.8 km', score: 97, address: 'Greams Lane, Thousand Lights, Chennai', phone: '+91 44 2829 0200', hours: 'Open 24/7', verified: true }
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cityQuery = searchParams.get('city');

  let filtered = placesDb;
  if (cityQuery && cityQuery.toLowerCase() !== 'all') {
    filtered = placesDb.filter(p => p.city.toLowerCase().includes(cityQuery.toLowerCase()));
  }

  return NextResponse.json({ success: true, count: filtered.length, places: filtered });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, address, phone, city } = body;

    const newHaven = {
      id: Date.now(),
      name: name || 'Suggested Safe Haven',
      type: 'haven',
      distance: 'Pending Audit',
      score: 90,
      address: address || (city ? `${city}, India` : 'New Delhi, Delhi NCR'),
      phone: phone || '+91 98765 43210',
      hours: 'Open 24/7',
      verified: false
    };

    placesDb.push(newHaven);

    return NextResponse.json({
      success: true,
      message: '🏥 Safe haven submitted! Aegis verification team will audit CCTV density.',
      haven: newHaven,
      places: placesDb
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
