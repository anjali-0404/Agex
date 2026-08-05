import { NextResponse } from 'next/server';

let contactsDb = [
  { id: 'c1', name: 'Rajesh Sharma (Father)', phone: '+91 98765 43210', relation: 'Family', priority: 1 },
  { id: 'c2', name: 'Priya Sharma (Mother)', phone: '+91 91234 56789', relation: 'Family', priority: 2 },
  { id: 'c3', name: 'Rohan Verma (Emergency Contact)', phone: '+91 99887 76655', relation: 'Friend', priority: 3 },
  { id: 'c4', name: 'Delhi Police Control Room', phone: '112', relation: 'Police', priority: 4 },
  { id: 'c5', name: 'National Women Helpline', phone: '1091', relation: 'Helpline', priority: 5 }
];

export async function GET() {
  return NextResponse.json({ success: true, contacts: contactsDb });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, relation } = body;

    let cleanPhone = phone ? String(phone).replace(/\D/g, '') : '';
    let formattedPhone = phone;
    if (cleanPhone.length === 10) {
      formattedPhone = `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
    } else if (!phone.startsWith('+91') && cleanPhone.length > 5) {
      formattedPhone = `+91 ${cleanPhone}`;
    }

    const newContact = {
      id: 'c_' + Date.now(),
      name: name || 'Emergency Contact',
      phone: formattedPhone || '+91 98765 43210',
      relation: relation || 'Family',
      priority: contactsDb.length + 1
    };

    contactsDb.push(newContact);

    return NextResponse.json({ success: true, contact: newContact, contacts: contactsDb });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
