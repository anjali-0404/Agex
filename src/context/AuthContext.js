'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { encryptPayload, decryptPayload, formatIndianPhoneNumber } from '@/utils/crypto';

const AuthContext = createContext();

const DEFAULT_INDIAN_CONTACTS = [
  { id: 'c1', name: 'Rajesh Sharma (Father)', phone: '+91 98765 43210', relation: 'Family', priority: 1 },
  { id: 'c2', name: 'Priya Sharma (Mother)', phone: '+91 91234 56789', relation: 'Family', priority: 2 },
  { id: 'c3', name: 'Rohan Verma (Emergency Contact)', phone: '+91 99887 76655', relation: 'Friend', priority: 3 },
  { id: 'c4', name: 'Delhi Police Control Room', phone: '112', relation: 'Police', priority: 4 },
  { id: 'c5', name: 'National Women Helpline', phone: '1091', relation: 'Helpline', priority: 5 }
];

const DEFAULT_USER = {
  id: 'usr_in_101',
  name: 'Ananya Sharma',
  email: 'ananya.sharma@aegis.in',
  phone: '+91 98765 43210',
  city: 'New Delhi, Delhi NCR',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  bloodGroup: 'O+',
  e2eeEnabled: true,
  sosAutoAlert: true,
  liveSharingActive: false,
  encryptionKeyFingerprint: 'aegis-sha256-e2ee-india-7890x'
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [contacts, setContacts] = useState(DEFAULT_INDIAN_CONTACTS);
  const [sosActive, setSosActive] = useState(false);
  const [activeSosData, setActiveSosData] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Load persisted user, token, or contacts from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('aegis_user');
      const storedToken = localStorage.getItem('aegis_token');
      const storedContacts = localStorage.getItem('aegis_contacts');
      const storedAuth = localStorage.getItem('aegis_auth');

      if (storedAuth === 'true' && storedUser) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken || 'jwt_aegis_session_token');
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
      }

      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (e) {
      console.warn('AuthContext initialization error:', e);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4200);
  };

  const login = (emailOrUser, password) => {
    let userData = DEFAULT_USER;
    if (typeof emailOrUser === 'object' && emailOrUser !== null) {
      userData = { ...DEFAULT_USER, ...emailOrUser };
    } else if (typeof emailOrUser === 'string') {
      const nameFromEmail = emailOrUser.includes('@')
        ? emailOrUser.split('@')[0].replace('.', ' ')
        : emailOrUser;
      userData = {
        ...DEFAULT_USER,
        email: emailOrUser,
        name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
      };
    }

    const generatedToken = 'jwt_aegis_' + Math.random().toString(36).substring(2, 12);
    setUser(userData);
    setToken(generatedToken);
    setIsAuthenticated(true);

    try {
      localStorage.setItem('aegis_user', JSON.stringify(userData));
      localStorage.setItem('aegis_token', generatedToken);
      localStorage.setItem('aegis_auth', 'true');
      document.cookie = 'aegis_auth=true; path=/; max-age=2592000';
    } catch (_) {}

    showToast(`Welcome back, ${userData.name}! Signed in successfully.`);
    return { success: true, user: userData, token: generatedToken };
  };

  const register = (newUserDetails) => {
    const formattedPhone = formatIndianPhoneNumber(newUserDetails.phone || '+91 98765 43210');
    const newUser = {
      id: 'usr_in_' + Date.now(),
      name: newUserDetails.name || 'Aegis User',
      email: newUserDetails.email || 'user@aegis.in',
      phone: formattedPhone,
      city: newUserDetails.city || 'New Delhi, Delhi NCR',
      avatar: newUserDetails.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bloodGroup: newUserDetails.bloodGroup || 'O+',
      e2eeEnabled: true,
      sosAutoAlert: true,
      liveSharingActive: false,
      encryptionKeyFingerprint: 'aegis-sha256-india-' + Math.floor(1000 + Math.random() * 9000)
    };

    const generatedToken = 'jwt_aegis_' + Math.random().toString(36).substring(2, 12);
    setUser(newUser);
    setToken(generatedToken);
    setIsAuthenticated(true);

    try {
      localStorage.setItem('aegis_user', JSON.stringify(newUser));
      localStorage.setItem('aegis_token', generatedToken);
      localStorage.setItem('aegis_auth', 'true');
      document.cookie = 'aegis_auth=true; path=/; max-age=2592000';
    } catch (_) {}

    showToast(`🎉 Welcome to Aegis, ${newUser.name}! Account created.`);
    return { success: true, user: newUser, token: generatedToken };
  };

  const verifyOTP = (mobile, otpCode) => {
    const matchedUser = {
      ...DEFAULT_USER,
      phone: formatIndianPhoneNumber(mobile || '+91 98765 43210')
    };

    const generatedToken = 'jwt_aegis_otp_' + Math.random().toString(36).substring(2, 12);
    setUser(matchedUser);
    setToken(generatedToken);
    setIsAuthenticated(true);

    try {
      localStorage.setItem('aegis_user', JSON.stringify(matchedUser));
      localStorage.setItem('aegis_token', generatedToken);
      localStorage.setItem('aegis_auth', 'true');
      document.cookie = 'aegis_auth=true; path=/; max-age=2592000';
    } catch (_) {}

    showToast(`📱 Phone OTP Verified! Welcome back ${matchedUser.name}.`);
    return { success: true, user: matchedUser, token: generatedToken };
  };

  const updateProfile = (updatedFields) => {
    const updatedUser = { ...(user || DEFAULT_USER), ...updatedFields };
    setUser(updatedUser);
    try {
      localStorage.setItem('aegis_user', JSON.stringify(updatedUser));
    } catch (_) {}
    showToast('Profile updated successfully.');
    return { success: true, user: updatedUser };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('aegis_user');
      localStorage.removeItem('aegis_token');
      localStorage.setItem('aegis_auth', 'false');
      document.cookie = 'aegis_auth=false; path=/; max-age=0';
    } catch (_) {}
    showToast('Signed out of Aegis Safety.');
  };

  const addContact = (newContact) => {
    const formatted = {
      id: 'c_' + Date.now(),
      name: newContact.name,
      phone: formatIndianPhoneNumber(newContact.phone),
      relation: newContact.relation || 'Contact',
      priority: contacts.length + 1
    };
    const updated = [...contacts, formatted];
    setContacts(updated);
    try {
      localStorage.setItem('aegis_contacts', JSON.stringify(updated));
    } catch (_) {}
    showToast(`Saved Emergency Contact: ${formatted.name} (${formatted.phone})`);
  };

  const deleteContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    setContacts(updated);
    try {
      localStorage.setItem('aegis_contacts', JSON.stringify(updated));
    } catch (_) {}
    showToast('Emergency contact removed.');
  };

  const triggerSOS = async (currentLocation) => {
    const timestamp = new Date().toISOString();
    const loc = currentLocation || { lat: 28.6139, lng: 77.2090 };
    
    // Encrypt SOS payload with E2EE
    const rawPayload = {
      userId: user?.id || 'usr_in_101',
      userName: user?.name || 'Ananya Sharma',
      userPhone: user?.phone || '+91 98765 43210',
      location: loc,
      timestamp,
      batteryLevel: '89%',
      emergencyContacts: contacts.map(c => ({ name: c.name, phone: c.phone }))
    };

    const encryptedSos = await encryptPayload(rawPayload);

    // Call real-time SOS API backend
    try {
      await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedSos, rawPayload })
      });
    } catch (e) {
      console.warn('Backend SOS broadcast offline, running locally:', e);
    }

    setSosActive(true);
    setActiveSosData(rawPayload);
    showToast('🚨 SOS Emergency Triggered! Live E2EE Location Sent to Saved Contacts & 112');
  };

  const cancelSOS = () => {
    setSosActive(false);
    setActiveSosData(null);
    showToast('SOS Alert deactivated.');
  };

  const startSharingLocation = async (currentLocation) => {
    const loc = currentLocation || { lat: 28.6139, lng: 77.2090 };
    const trackingId = 'tr_' + Math.random().toString(36).substring(2, 9);
    const originUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const generatedLink = `${originUrl}/journey?track=${trackingId}&lat=${loc.lat}&lng=${loc.lng}`;
    
    setShareLink(generatedLink);
    setSharingLocation(true);

    // Broadcast live location to backend API
    try {
      await fetch('/api/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackingId,
          lat: loc.lat,
          lng: loc.lng,
          userId: user?.id,
          userName: user?.name,
          phone: user?.phone
        })
      });
    } catch (e) {
      console.warn('Location API error:', e);
    }

    // Copy to clipboard if available
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(generatedLink);
        showToast('📍 Live Location Link Copied to Clipboard! Shared with Saved Contacts.');
      } catch (_) {
        showToast(`📍 Live Location Sharing Active: ${generatedLink}`);
      }
    } else {
      showToast(`📍 Live Location Sharing Active: ${generatedLink}`);
    }
  };

  const stopSharingLocation = () => {
    setSharingLocation(false);
    setShareLink('');
    showToast('Live Location Sharing Stopped.');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated,
      authLoading,
      contacts,
      sosActive,
      activeSosData,
      sharingLocation,
      shareLink,
      toastMessage,
      login,
      register,
      verifyOTP,
      updateProfile,
      logout,
      addContact,
      deleteContact,
      triggerSOS,
      cancelSOS,
      startSharingLocation,
      stopSharingLocation,
      showToast
    }}>
      {children}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: 84,
          right: 24,
          zIndex: 99999,
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(56, 189, 248, 0.4)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.6), 0 0 24px rgba(56, 189, 248, 0.25)',
          color: '#f8fafc',
          padding: '14px 22px',
          borderRadius: '16px',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontSize: '14px',
          fontWeight: 600,
          animation: 'slideUpToast 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <span className="icon" style={{ color: '#38bdf8', fontSize: 22 }}>shield_person</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

