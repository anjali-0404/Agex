import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, phone, name, password, otp, action } = body;

    // Simulate minor network delay for realistic experience
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (action === 'google') {
      return NextResponse.json({
        success: true,
        message: 'Google OAuth Session Verified!',
        token: `jwt_aegis_google_${Date.now()}`,
        user: {
          id: `usr_google_${Date.now()}`,
          name: body.name || 'Ananya Sharma',
          email: body.email || 'ananya.sharma@gmail.com',
          phone: '+91 98765 43210',
          city: 'New Delhi, Delhi NCR',
          avatar: body.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          provider: 'google',
          e2eeEnabled: true
        }
      });
    }

    if (action === 'verify-otp') {
      if (!otp || otp.length < 4) {
        return NextResponse.json({ success: false, error: 'Invalid 6-digit OTP code' }, { status: 400 });
      }
      return NextResponse.json({
        success: true,
        message: 'Mobile OTP verified successfully!',
        token: `jwt_aegis_otp_${Date.now()}`,
        user: {
          id: `usr_in_otp_${Date.now()}`,
          name: name || 'Aegis Verified User',
          phone: phone || '+91 98765 43210',
          email: email || 'verified.user@aegis.in',
          city: 'New Delhi, Delhi NCR',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          e2eeEnabled: true,
          encryptionKeyFingerprint: `aegis-sha256-e2ee-india-${Math.floor(1000 + Math.random() * 9000)}`
        }
      });
    }

    if (action === 'signup' || action === 'register') {
      if (!email || !password) {
        return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
      }
      const newUserName = name || email.split('@')[0].replace('.', ' ');
      return NextResponse.json({
        success: true,
        message: 'E2EE Aegis Account created successfully!',
        token: `jwt_aegis_reg_${Date.now()}`,
        user: {
          id: `usr_in_${Date.now()}`,
          name: newUserName.charAt(0).toUpperCase() + newUserName.slice(1),
          email,
          phone: phone || '+91 98765 43210',
          city: body.city || 'New Delhi, Delhi NCR',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          e2eeEnabled: true,
          encryptionKeyFingerprint: `aegis-sha256-e2ee-india-${Math.floor(1000 + Math.random() * 9000)}`
        }
      });
    }

    // Default Login Action
    const userEmail = email || 'ananya.sharma@aegis.in';
    const computedName = email ? email.split('@')[0].replace('.', ' ') : 'Ananya Sharma';

    const mockUser = {
      id: 'usr_in_101',
      name: computedName.charAt(0).toUpperCase() + computedName.slice(1),
      email: userEmail,
      phone: phone || '+91 98765 43210',
      city: 'New Delhi, Delhi NCR',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      token: 'jwt_aegis_e2ee_token_2026_india',
      e2eeEnabled: true,
      encryptionKeyFingerprint: 'aegis-sha256-e2ee-india-7890x'
    };

    return NextResponse.json({
      success: true,
      message: 'Login authenticated with 256-Bit E2EE session!',
      token: mockUser.token,
      user: mockUser
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

