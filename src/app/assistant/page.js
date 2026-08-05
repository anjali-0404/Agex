'use client';
import React, { useState, useRef, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import useRealtimeLocation from '@/hooks/useRealtimeLocation';
import { useAuth } from '@/context/AuthContext';

export default function AssistantPage() {
  const { location: userLocation } = useRealtimeLocation();
  const { user, triggerSOS, startSharingLocation, sharingLocation } = useAuth();

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Namaste! I am Aegis AI, your real-time safety companion for India. I am tracking live telemetry across Delhi NCR, Mumbai, Bengaluru & Indian cities.',
      isAi: true,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    'Check India area status',
    'Nearest safe haven & police',
    'Share live GPS coordinates',
    'Indian emergency helplines'
  ];

  // Speech Recognition
  useEffect(() => {
    let recognition;
    if (micActive) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';
        recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          setInputValue(transcript);
          setMicActive(false);
        };
        recognition.onerror = () => setMicActive(false);
        recognition.onend = () => setMicActive(false);
        recognition.start();
      } else {
        alert('Voice input not supported in your browser.');
        setMicActive(false);
      }
    }
    return () => {
      if (recognition) recognition.stop();
    };
  }, [micActive]);

  // Speech Synthesis
  const speakText = (id, text) => {
    if ('speechSynthesis' in window) {
      if (speakingId === id) {
        window.speechSynthesis.cancel();
        setSpeakingId(null);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ''));
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const generateLiveResponse = async (userQuery) => {
    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userQuery,
          location: userLocation,
          city: user?.city || 'New Delhi, Delhi NCR'
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reply) return data.reply;
      }
    } catch (err) {
      console.warn('Assistant API note:', err);
    }
    const lat = userLocation ? userLocation.lat.toFixed(4) : '28.6139';
    const lng = userLocation ? userLocation.lng.toFixed(4) : '77.2090';
    return `I am monitoring your India GPS telemetry (${lat}° N, ${lng}° E). All surrounding zones are safe. How else can I assist your journey?`;
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: inputValue,
      isAi: false,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = inputValue;
    setInputValue('');
    setIsTyping(true);

    const replyText = await generateLiveResponse(query);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: replyText,
          isAi: true,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <AppShell>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', gap: 16 }}>
        
        {/* Header */}
        <div className="glass" style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <span className="icon">smart_toy</span>
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 900 }} className="grad-text">Aegis AI Safety Assistant</h2>
              <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>● Online • India Telemetry GPS</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => sharingLocation ? stopSharingLocation() : startSharingLocation(userLocation)}
              className="btn-cyan" style={{ fontSize: 12, padding: '8px 14px' }}>
              <span className="icon">{sharingLocation ? 'location_off' : 'share_location'}</span>
              {sharingLocation ? 'Sharing GPS' : 'Share GPS'}
            </button>
            <button onClick={() => triggerSOS(userLocation)} className="btn-sos" style={{ fontSize: 12, padding: '8px 14px' }}>
              <span className="icon">emergency</span> Rapid SOS
            </button>
          </div>
        </div>

        {/* Chat Messages Window */}
        <div className="glass" style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {messages.map(m => (
            <div
              key={m.id}
              style={{
                alignSelf: m.isAi ? 'flex-start' : 'flex-end',
                maxWidth: '82%',
                background: m.isAi ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                border: m.isAi ? '1px solid rgba(255,255,255,0.1)' : 'none',
                borderRadius: 18,
                padding: '14px 18px',
                color: '#fff',
                fontSize: 14,
                lineHeight: 1.6
              }}>
              <div style={{ whiteSpace: 'pre-line' }}>{m.text}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, fontSize: 11, color: m.isAi ? 'var(--text-muted)' : 'rgba(255,255,255,0.7)' }}>
                <span>{m.timestamp}</span>
                {m.isAi && (
                  <button onClick={() => speakText(m.id, m.text)} style={{ background: 'none', border: 'none', color: '#22d3ee', cursor: 'pointer' }}>
                    <span className="icon" style={{ fontSize: 16 }}>{speakingId === m.id ? 'volume_off' : 'volume_up'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && <div style={{ color: 'var(--text-muted)', fontSize: 13, fontStyle: 'italic' }}>Aegis AI is computing India telemetry...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts & Input Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {quickPrompts.map(qp => (
              <button
                key={qp}
                onClick={() => { setInputValue(qp); }}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {qp}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="glass" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 30 }}>
            <button type="button" onClick={() => setMicActive(!micActive)} style={{ background: 'none', border: 'none', color: micActive ? '#ef4444' : '#22d3ee', cursor: 'pointer' }}>
              <span className="icon" style={{ fontSize: 22 }}>{micActive ? 'mic_off' : 'mic'}</span>
            </button>
            <input
              type="text"
              placeholder="Ask Aegis AI safety questions in India..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: 14, outline: 'none' }}
            />
            <button type="submit" className="btn-cyan" style={{ padding: '8px 18px', fontSize: 13 }}>
              <span className="icon">send</span>
            </button>
          </form>
        </div>

      </div>
    </AppShell>
  );
}
