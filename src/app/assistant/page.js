'use client';
import React, { useState, useRef, useEffect } from 'react';
import AppShell from '@/components/AppShell';

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am Aegis, your AI safety assistant. How can I help you stay safe today?', isAi: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Nearest safe place", "Share location", "Night walk tips", "Check area status"
  ];

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now(), text, isAi: false }]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      let reply = "I am processing your safety request...";
      const t = text.toLowerCase();
      if (t.includes('safe right now')) {
        reply = "Current data indicates Main St has good lighting and regular patrols. However, always remain vigilant.";
      } else if (t.includes('police station')) {
        reply = "The nearest police station is Downtown Precinct, located 0.8 miles away on 5th Avenue.";
      } else if (t.includes('emergency') || t.includes('help')) {
        reply = "If this is an emergency, please call 911 immediately! Otherwise, I can notify your emergency contacts.";
      }
      
      setMessages(prev => [...prev, { id: Date.now(), text: reply, isAi: true }]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <AppShell>
      <div className="assistant-container">
        <div className="chat-card">
          <div className="chat-header">
            <div className="orb-container">
              <div className="pulse-orb"></div>
            </div>
            <div>
              <h2 className="header-title">Aegis AI</h2>
              <p className="header-status">Online • Ready to assist</p>
            </div>
          </div>

          <div className="chat-thread">
            {messages.map(msg => (
              <div key={msg.id} className={`message-wrapper ${msg.isAi ? 'ai' : 'user'}`}>
                {msg.isAi && <div className="avatar-orb"></div>}
                <div className={`message-bubble ${msg.isAi ? 'ai-bubble' : 'user-bubble'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper ai">
                <div className="avatar-orb"></div>
                <div className="message-bubble ai-bubble typing">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="quick-prompts">
              {quickPrompts.map(prompt => (
                <button key={prompt} className="prompt-chip" onClick={() => handleSend(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
            
            <div className="input-box">
              <button 
                className={`mic-btn ${micActive ? 'active' : ''}`}
                onClick={() => setMicActive(!micActive)}
              >
                🎤
              </button>
              <input 
                type="text" 
                placeholder="Ask Aegis about your safety..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className="send-btn" onClick={() => handleSend()}>
                ➤
              </button>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .assistant-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100vh - 64px); /* assuming header offset */
            padding: 1rem;
            background: linear-gradient(135deg, #09090b 0%, #171717 100%);
            font-family: 'Inter', sans-serif;
          }
          .chat-card {
            width: 100%;
            max-width: 600px;
            height: 90vh;
            max-height: 800px;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 24px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
          }
          .chat-header {
            padding: 1.5rem;
            background: rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .orb-container {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .pulse-orb {
            width: 20px;
            height: 20px;
            background: #22d3ee;
            border-radius: 50%;
            box-shadow: 0 0 20px #22d3ee, 0 0 40px #22d3ee;
            animation: pulse 2s infinite ease-in-out;
          }
          @keyframes pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 10px #22d3ee; }
            50% { transform: scale(1.1); box-shadow: 0 0 25px #22d3ee; }
            100% { transform: scale(0.95); box-shadow: 0 0 10px #22d3ee; }
          }
          .header-title {
            color: #fff;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
          }
          .header-status {
            color: #22d3ee;
            font-size: 0.875rem;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          .chat-thread {
            flex: 1;
            overflow-y: auto;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            scrollbar-width: thin;
            scrollbar-color: rgba(255,255,255,0.1) transparent;
          }
          .message-wrapper {
            display: flex;
            gap: 1rem;
            align-items: flex-end;
            animation: fadeIn 0.3s ease-out forwards;
          }
          .message-wrapper.user {
            justify-content: flex-end;
          }
          .avatar-orb {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
            flex-shrink: 0;
          }
          .message-bubble {
            max-width: 80%;
            padding: 1rem 1.25rem;
            border-radius: 20px;
            font-size: 0.95rem;
            line-height: 1.5;
            color: #fff;
          }
          .ai-bubble {
            background: rgba(255, 255, 255, 0.08);
            border-bottom-left-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.05);
          }
          .user-bubble {
            background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
            border-bottom-right-radius: 4px;
            box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.3);
          }
          .typing {
            display: flex;
            gap: 0.3rem;
            align-items: center;
            padding: 1rem 1.5rem;
          }
          .dot {
            width: 6px;
            height: 6px;
            background: #cbd5e1;
            border-radius: 50%;
            animation: bounce 1.4s infinite ease-in-out both;
          }
          .dot:nth-child(1) { animation-delay: -0.32s; }
          .dot:nth-child(2) { animation-delay: -0.16s; }
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
          .chat-input-area {
            padding: 1rem 1.5rem 1.5rem;
            background: rgba(0, 0, 0, 0.2);
            border-top: 1px solid rgba(255, 255, 255, 0.05);
          }
          .quick-prompts {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding-bottom: 1rem;
            scrollbar-width: none;
          }
          .quick-prompts::-webkit-scrollbar { display: none; }
          .prompt-chip {
            background: rgba(34, 211, 238, 0.1);
            color: #22d3ee;
            border: 1px solid rgba(34, 211, 238, 0.3);
            border-radius: 16px;
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
            white-space: nowrap;
            cursor: pointer;
            transition: all 0.2s;
          }
          .prompt-chip:hover {
            background: rgba(34, 211, 238, 0.2);
          }
          .input-box {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 0.5rem;
          }
          .input-box input {
            flex: 1;
            background: transparent;
            border: none;
            color: #fff;
            padding: 0.75rem 0.5rem;
            font-size: 1rem;
            outline: none;
          }
          .input-box input::placeholder {
            color: #64748b;
          }
          .mic-btn, .send-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
          }
          .mic-btn:hover { background: rgba(255, 255, 255, 0.2); }
          .mic-btn.active {
            background: #ef4444;
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
            animation: pulse-red 1.5s infinite;
          }
          @keyframes pulse-red {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }
          .send-btn {
            background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          }
          .send-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
          }
        `}} />
      </div>
    </AppShell>
  );
}
