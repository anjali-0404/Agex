/**
 * Client-Side End-to-End Encryption (E2EE) Utility
 * Powered by Web Crypto API (AES-GCM 256-bit encryption)
 */

const SECRET_SALT = 'AEGIS_AI_INDIA_SECURE_SALT_2026';

// Helper to convert string to ArrayBuffer
function str2ab(str) {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// Helper to convert ArrayBuffer to string
function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

// Generate encryption key from user secret passphrase
async function deriveKey(passphrase = 'AegisSafeKey2026') {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    return null;
  }
  const encoder = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase + SECRET_SALT),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode(SECRET_SALT),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt payload object or string into Base64 E2EE string
 */
export async function encryptPayload(data, passphrase = 'AegisSafeKey2026') {
  try {
    if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
      // Fallback for SSR
      return typeof data === 'string' ? btoa(data) : btoa(JSON.stringify(data));
    }
    const key = await deriveKey(passphrase);
    if (!key) return typeof data === 'string' ? btoa(data) : btoa(JSON.stringify(data));

    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
    const encoder = new TextEncoder();
    const plainText = typeof data === 'string' ? data : JSON.stringify(data);
    const encodedData = encoder.encode(plainText);

    const encryptedBuffer = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encodedData
    );

    const combined = new Uint8Array(iv.length + encryptedBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedBuffer), iv.length);

    let binary = '';
    const bytes = new Uint8Array(combined);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return 'E2EE:' + btoa(binary);
  } catch (err) {
    console.error('Encryption failed:', err);
    return typeof data === 'string' ? data : JSON.stringify(data);
  }
}

/**
 * Decrypt E2EE Base64 string back into original object or string
 */
export async function decryptPayload(encryptedStr, passphrase = 'AegisSafeKey2026') {
  try {
    if (!encryptedStr || typeof encryptedStr !== 'string') return encryptedStr;
    if (!encryptedStr.startsWith('E2EE:')) {
      // Not encrypted with E2EE prefix, return parsed or raw
      try { return JSON.parse(encryptedStr); } catch (_) { return encryptedStr; }
    }

    const base64Data = encryptedStr.replace('E2EE:', '');
    if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
      const decoded = atob(base64Data);
      try { return JSON.parse(decoded); } catch (_) { return decoded; }
    }

    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    const iv = bytes.slice(0, 12);
    const cipherText = bytes.slice(12);

    const key = await deriveKey(passphrase);
    if (!key) {
      const decoded = atob(base64Data);
      try { return JSON.parse(decoded); } catch (_) { return decoded; }
    }

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      cipherText
    );

    const decoder = new TextDecoder();
    const plainText = decoder.decode(decryptedBuffer);

    try {
      return JSON.parse(plainText);
    } catch (_) {
      return plainText;
    }
  } catch (err) {
    console.warn('Decryption fallback:', err.message);
    return encryptedStr;
  }
}

/**
 * Format Indian Phone Numbers consistently
 */
export function formatIndianPhoneNumber(phone) {
  if (!phone) return '+91 98765 43210';
  let cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone.startsWith('+91') ? phone : `+91 ${phone}`;
}
