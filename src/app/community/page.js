'use client';
import React, { useState } from 'react';
import styles from './community.module.css';

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
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#3b82f6';
      default: return '#94a3b8';
    }
  };

  return (
    <div className={styles.feedContainer}>
      <div className={styles.contentWrapper}>
        
        <div className={styles.statsBanner}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>2,847</span>
            <span className={styles.statLabel}>reports this month</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={`${styles.statValue} ${styles.textGreen}`}>156</span>
            <span className={styles.statLabel}>resolved</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.statItem}>
            <span className={`${styles.statValue} ${styles.textCyan}`}>94%</span>
            <span className={styles.statLabel}>feel safer</span>
          </div>
        </div>

        <div className={styles.navContainer}>
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <button 
                key={tab} 
                className={activeTab === tab ? styles.tabBtnActive : styles.tabBtn}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.filters}>
            {filters.map(filter => (
              <button 
                key={filter} 
                className={activeFilter === filter ? styles.filterChipActive : styles.filterChip}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.postsList}>
          {posts.map(post => (
            <div key={post.id} className={styles.postCard}>
              <div className={styles.postHeader}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorAvatar}></div>
                  <div>
                    <h4 className={styles.authorName}>{post.author}</h4>
                    <p className={styles.postTime}>{post.time} • <span className={styles.locationTag}>📍 {post.location}</span></p>
                  </div>
                </div>
                <div 
                  className={styles.severityBadge} 
                  style={{ borderColor: getSeverityColor(post.severity), color: getSeverityColor(post.severity), backgroundColor: `${getSeverityColor(post.severity)}20` }}
                >
                  {post.severity}
                </div>
              </div>
              
              <div className={styles.postContent}>
                <span className={styles.categoryTag}>{post.category}</span>
                <p>{post.description}</p>
              </div>

              <div className={styles.postActions}>
                <button 
                  className={post.isUpvoted ? styles.actionBtnUpvoted : styles.actionBtn}
                  onClick={() => handleUpvote(post.id)}
                  aria-label={`Upvote report (${post.upvotes} upvotes)`}
                >
                  ▲ {post.upvotes}
                </button>
                <button className={styles.actionBtn}>💬 {post.comments} Comments</button>
                <button className={styles.shareBtn}>↪ Share</button>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.fabButton} title="Quick Post" aria-label="Create Quick Post">
          +
        </button>

      </div>
    </div>
  );
}
