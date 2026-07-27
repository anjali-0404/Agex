'use client';
import React, { useState } from 'react';
import AppShell from '@/components/AppShell';

export default function CommunityFeedPage() {
  const [activeTab, setActiveTab] = useState('Nearby');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Suspicious Activity');
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Anonymous Guardian',
      time: '10 mins ago',
      location: 'Central Corridor (0.2 mi)',
      category: 'Suspicious Activity',
      description: 'Streetlight flicker reported near north entrance. Aegis automated lighting check requested.',
      upvotes: 42,
      comments: [
        { id: 101, user: 'Sarah J.', text: 'Thanks for posting! Will take Main St instead.' }
      ],
      showComments: false,
      severity: 'Low',
      isUpvoted: false
    },
    {
      id: 2,
      author: 'Verified Resident',
      time: '2 hours ago',
      location: '5th Ave & 34th St (0.5 mi)',
      category: 'Unsafe Area',
      description: 'Street lights out for two blocks due to utility maintenance. Extremely dark; recommend taking well-lit sidewalk route.',
      upvotes: 128,
      comments: [
        { id: 102, user: 'David K.', text: 'Utility crew arrived 15 mins ago.' }
      ],
      showComments: false,
      severity: 'Medium',
      isUpvoted: true
    },
    {
      id: 3,
      author: 'Community Watch Hub',
      time: '5 hours ago',
      location: 'Downtown Transit Center',
      category: 'Assault',
      description: 'Officers responding to an active hazard near terminal B. Avoid east staircase.',
      upvotes: 356,
      comments: [],
      showComments: false,
      severity: 'High',
      isUpvoted: false
    }
  ]);

  const tabs = ['All', 'Nearby', 'Following', 'Verified'];
  const filters = ['All', 'Suspicious Activity', 'Unsafe Area', 'Assault', 'Property Crime', 'Harassment'];

  const handleUpvote = (id) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          upvotes: p.isUpvoted ? p.upvotes - 1 : p.upvotes + 1,
          isUpvoted: !p.isUpvoted
        };
      }
      return p;
    }));
  };

  const toggleComments = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, showComments: !p.showComments } : p));
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newEntry = {
      id: Date.now(),
      author: 'Sarah Johnson (You)',
      time: 'Just now',
      location: 'Current GPS Radius',
      category: newPostCategory,
      description: newPostText,
      upvotes: 1,
      comments: [],
      showComments: false,
      severity: 'Medium',
      isUpvoted: true
    };
    setPosts([newEntry, ...posts]);
    setNewPostText('');
    setShowPostModal(false);
  };

  const filteredPosts = posts.filter(p => {
    if (activeFilter !== 'All' && p.category !== activeFilter) return false;
    return true;
  });

  return (
    <AppShell>
      <div style={{ maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Header & Quick Action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900 }} className="grad-text">Community Safety Feed</h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
              Real-time crowd-sourced safety intelligence & neighborhood reports
            </p>
          </div>

          <button onClick={() => setShowPostModal(true)} className="btn-primary">
            <span className="icon">add</span> Post Safety Report
          </button>
        </div>

        {/* Stats Banner */}
        <div className="glass animate-in" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>THIS MONTH</span>
              <strong style={{ fontSize: 18, color: '#6366f1' }}>2,847 Reports</strong>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>RESOLVED</span>
              <strong style={{ fontSize: 18, color: '#10b981' }}>156 Hazards Fixed</strong>
            </div>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block' }}>COMMUNITY TRUST</span>
              <strong style={{ fontSize: 18, color: '#22d3ee' }}>94% Feel Safer</strong>
            </div>
          </div>
          <span className="badge badge-safe"><span className="pulse-dot pulse-dot-green" /> Live Feed Active</span>
        </div>

        {/* Tabs & Category Filter Chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 8 }}>
            {tabs.map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                style={{
                  background: 'none', border: 'none', color: activeTab === t ? '#6366f1' : 'var(--text-muted)',
                  fontSize: 14, fontWeight: 700, padding: '6px 12px', borderBottom: activeTab === t ? '2px solid #6366f1' : '2px solid transparent',
                  cursor: 'pointer'
                }}>
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, whitespace: 'nowrap',
                  background: activeFilter === f ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'rgba(255,255,255,0.03)',
                  border: activeFilter === f ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                  color: '#fff', cursor: 'pointer'
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredPosts.map(post => (
            <div key={post.id} className="glass animate-in" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{post.author}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{post.time} • 📍 {post.location}</div>
                  </div>
                </div>

                <span className={`badge ${post.severity === 'High' ? 'badge-error' : post.severity === 'Medium' ? 'badge-warning' : 'badge-safe'}`}>
                  {post.severity} Severity
                </span>
              </div>

              <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 8, background: 'rgba(99,102,241,0.15)', color: '#6366f1', fontSize: 11, fontWeight: 700, marginRight: 8 }}>
                  {post.category}
                </span>
                {post.description}
              </div>

              <div style={{ display: 'flex', gap: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 13 }}>
                <button
                  onClick={() => handleUpvote(post.id)}
                  style={{ background: post.isUpvoted ? 'rgba(99,102,241,0.2)' : 'none', border: post.isUpvoted ? '1px solid #6366f1' : 'none', color: post.isUpvoted ? '#6366f1' : 'var(--text-muted)', padding: '6px 12px', borderRadius: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                  ▲ {post.upvotes} Upvotes
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  💬 {post.comments.length} Comments
                </button>
              </div>

              {/* Expandable Comments Drawer */}
              {post.showComments && (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: 16, borderRadius: 14, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {post.comments.length > 0 ? (
                    post.comments.map(c => (
                      <div key={c.id} style={{ fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 6 }}>
                        <strong style={{ color: '#22d3ee' }}>{c.user}: </strong>
                        <span style={{ color: 'var(--text-secondary)' }}>{c.text}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>No comments yet. Be the first to reply!</div>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Quick Post Modal */}
        {showPostModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 16 }}>
            <div className="glass animate-in" style={{ width: '100%', maxWidth: 520, padding: 28, borderRadius: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>Post Safety Incident</h3>
                <button onClick={() => setShowPostModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                  <span className="icon">close</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Category</label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="input-glass">
                    {filters.filter(f => f !== 'All').map(f => (
                      <option key={f} value={f} style={{ background: '#080c18' }}>{f}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe what you observed..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="input-glass"
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
                  <button onClick={() => setShowPostModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '10px 20px', borderRadius: 20, fontWeight: 600, cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button onClick={handleCreatePost} className="btn-primary">
                    Publish Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
