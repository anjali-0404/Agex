'use client';
import React, { useState } from 'react';
import AppShell from '@/components/AppShell';

export default function CommunityFeedPage() {
  const [activeTab, setActiveTab] = useState('Nearby');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Anonymous User',
      time: '10 mins ago',
      location: 'Central Park North',
      category: 'Suspicious Activity',
      description: 'Noticed a group of individuals looking into parked cars near the north entrance.',
      upvotes: 42,
      comments: 5,
      severity: 'Low',
      isUpvoted: false
    },
    {
      id: 2,
      author: 'Verified Resident',
      time: '2 hours ago',
      location: '5th Ave & 34th St',
      category: 'Unsafe Area',
      description: 'Street lights are completely out for two blocks. Extremely dark and unsafe to walk right now.',
      upvotes: 128,
      comments: 14,
      severity: 'Medium',
      isUpvoted: true
    },
    {
      id: 3,
      author: 'Community Watch',
      time: '5 hours ago',
      location: 'Downtown Transit Center',
      category: 'Assault',
      description: 'Police responding to an altercation near the main terminal. Avoid the area if possible.',
      upvotes: 356,
      comments: 42,
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

  const getSeverityColor = (sev) => {
    switch(sev) {
      case 'High': return '#ef4444'; // red
      case 'Medium': return '#f59e0b'; // amber
      case 'Low': return '#3b82f6'; // blue
      default: return '#94a3b8';
    }
  };

  return (
    <AppShell>
      <div className="feed-container">
        <div className="content-wrapper">
          
          <div className="stats-banner">
            <div className="stat-item">
              <span className="stat-value">2,847</span>
              <span className="stat-label">reports this month</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value text-green">156</span>
              <span className="stat-label">resolved</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value text-cyan">94%</span>
              <span className="stat-label">feel safer</span>
            </div>
          </div>

          <div className="nav-container">
            <div className="tabs">
              {tabs.map(tab => (
                <button 
                  key={tab} 
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="filters">
              {filters.map(filter => (
                <button 
                  key={filter} 
                  className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="author-info">
                    <div className="author-avatar"></div>
                    <div>
                      <h4 className="author-name">{post.author}</h4>
                      <p className="post-time">{post.time} • <span className="location-tag">📍 {post.location}</span></p>
                    </div>
                  </div>
                  <div 
                    className="severity-badge" 
                    style={{ borderColor: getSeverityColor(post.severity), color: getSeverityColor(post.severity), backgroundColor: `${getSeverityColor(post.severity)}20` }}
                  >
                    {post.severity}
                  </div>
                </div>
                
                <div className="post-content">
                  <span className="category-tag">{post.category}</span>
                  <p>{post.description}</p>
                </div>

                <div className="post-actions">
                  <button 
                    className={`action-btn ${post.isUpvoted ? 'upvoted' : ''}`}
                    onClick={() => handleUpvote(post.id)}
                  >
                    ▲ {post.upvotes}
                  </button>
                  <button className="action-btn">💬 {post.comments} Comments</button>
                  <button className="action-btn share-btn">↪ Share</button>
                </div>
              </div>
            ))}
          </div>

          <button className="fab-button" title="Quick Post">
            +
          </button>

        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .feed-container {
            min-height: 100vh;
            background: #0f172a;
            color: #f8fafc;
            font-family: 'Inter', sans-serif;
            display: flex;
            justify-content: center;
            padding: 2rem 1rem;
          }
          .content-wrapper {
            width: 100%;
            max-width: 768px;
            position: relative;
          }
          .stats-banner {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 1.5rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
            animation: slideDown 0.5s ease-out;
          }
          .stat-item {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
          }
          .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
          }
          .text-green { color: #34d399; }
          .text-cyan { color: #22d3ee; }
          .stat-label {
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
          }
          .stat-divider {
            width: 1px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
          }
          .nav-container {
            margin-bottom: 2rem;
          }
          .tabs {
            display: flex;
            gap: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 1.5rem;
          }
          .tab-btn {
            background: none;
            border: none;
            color: #64748b;
            padding: 0.75rem 0;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            position: relative;
            transition: color 0.2s;
          }
          .tab-btn:hover {
            color: #cbd5e1;
          }
          .tab-btn.active {
            color: #fff;
          }
          .tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background: #38bdf8;
            box-shadow: 0 0 10px #38bdf8;
          }
          .filters {
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            padding-bottom: 0.5rem;
            scrollbar-width: none;
          }
          .filters::-webkit-scrollbar { display: none; }
          .filter-chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #cbd5e1;
            padding: 0.4rem 1rem;
            border-radius: 20px;
            font-size: 0.875rem;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
          }
          .filter-chip:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          .filter-chip.active {
            background: rgba(56, 189, 248, 0.15);
            border-color: #38bdf8;
            color: #38bdf8;
          }
          .posts-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          .post-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            padding: 1.5rem;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .post-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px -10px rgba(0,0,0,0.5);
            border-color: rgba(255, 255, 255, 0.1);
          }
          .post-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
          }
          .author-info {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          .author-avatar {
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #475569 0%, #1e293b 100%);
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.1);
          }
          .author-name {
            margin: 0 0 0.25rem 0;
            font-weight: 600;
          }
          .post-time {
            margin: 0;
            font-size: 0.75rem;
            color: #64748b;
          }
          .location-tag {
            color: #38bdf8;
          }
          .severity-badge {
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            border: 1px solid;
          }
          .post-content {
            margin-bottom: 1.5rem;
          }
          .category-tag {
            display: inline-block;
            font-size: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            padding: 0.2rem 0.6rem;
            border-radius: 4px;
            margin-bottom: 0.75rem;
            color: #cbd5e1;
          }
          .post-content p {
            margin: 0;
            line-height: 1.6;
            color: #e2e8f0;
          }
          .post-actions {
            display: flex;
            gap: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            padding-top: 1rem;
          }
          .action-btn {
            background: transparent;
            border: none;
            color: #94a3b8;
            font-size: 0.875rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: color 0.2s;
            padding: 0.5rem 0;
          }
          .action-btn:hover {
            color: #fff;
          }
          .action-btn.upvoted {
            color: #38bdf8;
          }
          .share-btn {
            margin-left: auto;
          }
          .fab-button {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 10px 25px rgba(56, 189, 248, 0.5);
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 100;
          }
          .fab-button:hover {
            transform: scale(1.1) rotate(90deg);
            box-shadow: 0 15px 35px rgba(56, 189, 248, 0.7);
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </div>
    </AppShell>
  );
}
