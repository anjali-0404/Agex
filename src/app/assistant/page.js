'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './assistant.module.css';

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
    <div className={styles.assistantContainer}>
      <div className={styles.chatCard}>
        <div className={styles.chatHeader}>
          <div className={styles.orbContainer}>
            <div className={styles.pulseOrb}></div>
          </div>
          <div>
            <h2 className={styles.headerTitle}>Aegis AI</h2>
            <p className={styles.headerStatus}>Online • Ready to assist</p>
          </div>
        </div>

        <div className={styles.chatThread}>
          {messages.map(msg => (
            <div key={msg.id} className={msg.isAi ? styles.messageWrapper : styles.messageWrapperUser}>
              {msg.isAi && <div className={styles.avatarOrb}></div>}
              <div className={msg.isAi ? styles.aiBubble : styles.userBubble}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={styles.messageWrapper}>
              <div className={styles.avatarOrb}></div>
              <div className={`${styles.aiBubble} ${styles.typing}`}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.chatInputArea}>
          <div className={styles.quickPrompts}>
            {quickPrompts.map(prompt => (
              <button key={prompt} className={styles.promptChip} onClick={() => handleSend(prompt)}>
                {prompt}
              </button>
            ))}
          </div>
          
          <div className={styles.inputBox}>
            <button 
              className={micActive ? styles.micBtnActive : styles.micBtn}
              onClick={() => setMicActive(!micActive)}
              aria-label={micActive ? "Stop Voice Input" : "Start Voice Input"}
            >
              🎤
            </button>
            <input 
              type="text" 
              placeholder="Ask Aegis about your safety..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              aria-label="Ask Aegis about your safety"
            />
            <button className={styles.sendBtn} onClick={() => handleSend()} aria-label="Send Message">
              ➤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
