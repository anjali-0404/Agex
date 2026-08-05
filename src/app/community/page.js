'use client';
import React, { useState, useEffect } from 'react';
import AppShell from '@/components/AppShell';
import { useAuth } from '@/context/AuthContext';

const CITIES = [
  { id: 'all', label: 'All Cities' },
  { id: 'New Delhi', label: 'New Delhi' },
  { id: 'Gurugram', label: 'Gurugram' },
  { id: 'Mumbai', label: 'Mumbai' },
  { id: 'Bengaluru', label: 'Bengaluru' },
  { id: 'Hyderabad', label: 'Hyderabad' },
  { id: 'Pune', label: 'Pune' },
];

export default function CommunityFeedPage() {
  const { user } = useAuth();
  const [selectedCity, setSelectedCity] = useState('all');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Suspicious Activity');
  
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const storedCity = localStorage.getItem('aegis_selected_city');
      if (storedCity) {
        setSelectedCity(storedCity);
      } else if (user?.city) {
        if (user.city.toLowerCase().includes('delhi')) setSelectedCity('New Delhi');
        else if (user.city.toLowerCase().includes('mumbai')) setSelectedCity('Mumbai');
        else if (user.city.toLowerCase().includes('bengaluru') || user.city.toLowerCase().includes('bangalore')) setSelectedCity('Bengaluru');
      }
    } catch (_) {}
  }, [user]);

  useEffect(() => {
    async function fetchCommunityPosts() {
      try {
        const url = selectedCity === 'all' ? '/api/community' : `/api/community?city=${encodeURIComponent(selectedCity)}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data.posts) setPosts(data.posts);
        }
      } catch (err) {
        console.warn('Community API note:', err);
      }
    }
    fetchCommunityPosts();
  }, [selectedCity]);

  const filters = ['All', 'Suspicious Activity', 'Unsafe Area', 'Verified Patrol', 'Harassment'];

  const handleUpvote = async (id) => {
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

    try {
      await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote', postId: id })
      });
    } catch (_) {}
  };

  const toggleComments = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, showComments: !p.showComments } : p));
  };

  const handleCreatePost = async () => {
    if (!newPostText.trim()) return;
    const authorName = `${user?.name || 'Ananya Sharma'} (You)`;
    
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          postText: newPostText,
          category: newPostCategory,
          author: authorName
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.posts) setPosts(data.posts);
      }
    } catch (_) {
      const newEntry = {
        id: Date.now(),
        author: authorName,
        time: 'Just now',
        location: 'Connaught Place, New Delhi',
        category: newPostCategory,
        description: newPostText,
        upvotes: 1,
        comments: [],
        showComments: false,
        severity: 'Medium',
        isUpvoted: true
      };
      setPosts([newEntry, ...posts]);
    }
    setNewPostText('');
    setShowPostModal(false);
  };

  const filteredPosts = posts.filter(p => {
    if (activeFilter !== 'All' && p.category !== activeFilter) return false;
    return true;
  });

  return (
    <AppShell>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        
        {/* Header */}
        <div className="glass animate-in" style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 900 }} className="grad-text">India Community Safety Feed</h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              Real-time crowdsourced safety warnings & police patrol updates across Delhi NCR, Mumbai & Bengaluru
            </p>
          </div>
          <button onClick={() => setShowPostModal(true)} className="btn-cyan">
            <span className="icon">add_comment</span> Post Community Update
          </button>
        </div>

        {/* City Filter Selector */}
        <div className="glass" style={{ padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="icon" style={{ fontSize: 16, color: '#38bdf8' }}>location_on</span>
            Select City / Active Route Feed:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CITIES.map(c => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCity(c.id);
                  try { localStorage.setItem('aegis_selected_city', c.id); } catch (_) {}
                }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                  background: selectedCity === c.id ? 'linear-gradient(135deg, #3b82f6, #6366f1)' : 'rgba(255,255,255,0.04)',
                  border: selectedCity === c.id ? '1px solid #60a5fa' : '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 18px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                background: activeFilter === f ? '#6366f1' : 'rgba(255,255,255,0.04)',
                border: activeFilter === f ? '1px solid #818cf8' : '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer'
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Post Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filteredPosts.map(post => (
            <div key={post.id} className="glass animate-in" style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800 }}>
                    {post.author[0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#f8fafc' }}>{post.author}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>📍 {post.location} • {post.time}</div>
                  </div>
                </div>
                <span className="badge badge-cyan">{post.category}</span>
              </div>

              <p style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.6, marginBottom: 16 }}>
                {post.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 20, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
                <button
                  onClick={() => handleUpvote(post.id)}
                  style={{ background: 'none', border: 'none', color: post.isUpvoted ? '#22d3ee' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, cursor: 'pointer' }}>
                  <span className="icon">thumb_up</span> {post.upvotes} Upvotes
                </button>

                <button
                  onClick={() => toggleComments(post.id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, cursor: 'pointer' }}>
                  <span className="icon">comment</span> {post.comments.length} Comments
                </button>
              </div>

              {post.showComments && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {post.comments.map(c => (
                    <div key={c.id} style={{ background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: 10, fontSize: 13 }}>
                      <strong style={{ color: '#22d3ee' }}>{c.user}: </strong>
                      <span style={{ color: '#cbd5e1' }}>{c.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Create Post Modal */}
        {showPostModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(8,12,24,0.85)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <div className="glass" style={{ width: '100%', maxWidth: 500, padding: 28 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 16 }}>Post India Community Safety Alert</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <textarea
                  rows={4}
                  placeholder="Share safety update, streetlight outages, or PCR sightings in your locality..."
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  style={{ width: '100%' }}
                />

                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setShowPostModal(false)} style={{ flex: 1, padding: 12, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 12, color: '#fff', fontWeight: 700 }}>Cancel</button>
                  <button onClick={handleCreatePost} className="btn-cyan" style={{ flex: 1, justifyContent: 'center' }}>Post Alert</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppShell>
  );
}
