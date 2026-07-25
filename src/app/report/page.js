'use client';
import React, { useState } from 'react';
import styles from './report.module.css';

export default function ReportIncidentPage() {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const categories = [
    'Harassment', 'Poor Lighting', 'Suspicious Activity', 
    'Unsafe Area', 'Assault', 'Property Crime'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className={styles.reportContainer}>
      <div className={styles.glassCard}>
        {!isSuccess ? (
          <>
            <h1 className={styles.title}>Report an Incident</h1>
            <p className={styles.subtitle}>Help keep our community safe by reporting incidents or hazards.</p>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Incident Category</label>
                <div className={styles.chipContainer}>
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={category === c ? styles.chipSelected : styles.chip}
                      onClick={() => setCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="location-input">Location</label>
                <div className={styles.locationInputWrapper}>
                  <input 
                    id="location-input"
                    type="text" 
                    placeholder="Enter address or use current location" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <button type="button" className={styles.btnLocation} onClick={() => setLocation('Current Location (Auto-filled)')}>
                    📍 Auto-fill
                  </button>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={`${styles.formGroup} ${styles.half}`}>
                  <label htmlFor="incident-date">Date</label>
                  <input id="incident-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className={`${styles.formGroup} ${styles.half}`}>
                  <label htmlFor="incident-time">Time</label>
                  <input id="incident-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description-input">Description ({description.length}/500)</label>
                <textarea 
                  id="description-input"
                  rows="4" 
                  maxLength="500"
                  placeholder="Provide details about what happened..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className={styles.formGroup}>
                <label>Media / Photos (Optional)</label>
                <div className={styles.uploadArea}>
                  <p>Drag & Drop images here or <span>browse</span></p>
                </div>
              </div>

              <div className={styles.toggleGroup}>
                <label className={styles.toggleLabel}>
                  <span>Submit Anonymously</span>
                  <input 
                    type="checkbox" 
                    checked={anonymous} 
                    onChange={(e) => setAnonymous(e.target.checked)} 
                  />
                  <span className={styles.toggleSlider}></span>
                </label>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          </>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2>Report Submitted!</h2>
            <p>Thank you for contributing to community safety.</p>
            <button className={styles.submitBtn} onClick={() => setIsSuccess(false)}>Submit Another Report</button>
          </div>
        )}
      </div>
    </div>
  );
}
