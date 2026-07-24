'use client';
import React, { useState } from 'react';
import AppShell from '@/components/AppShell';

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
    <AppShell>
      <div className="report-container">
        <div className="glass-card">
          {!isSuccess ? (
            <>
              <h1 className="title">Report an Incident</h1>
              <p className="subtitle">Help keep our community safe by reporting incidents or hazards.</p>
              
              <form onSubmit={handleSubmit} className="report-form">
                <div className="form-group">
                  <label>Incident Category</label>
                  <div className="chip-container">
                    {categories.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`chip ${category === c ? 'selected' : ''}`}
                        onClick={() => setCategory(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <div className="location-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Enter address or use current location" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <button type="button" className="btn-location" onClick={() => setLocation('Current Location (Auto-filled)')}>
                      📍 Auto-fill
                    </button>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                  </div>
                  <div className="form-group half">
                    <label>Time</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description ({description.length}/500)</label>
                  <textarea 
                    rows="4" 
                    maxLength="500"
                    placeholder="Provide details about what happened..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Media / Photos (Optional)</label>
                  <div className="upload-area">
                    <p>Drag & Drop images here or <span>browse</span></p>
                  </div>
                </div>

                <div className="form-group toggle-group">
                  <label className="toggle-label">
                    <span>Submit Anonymously</span>
                    <input 
                      type="checkbox" 
                      checked={anonymous} 
                      onChange={(e) => setAnonymous(e.target.checked)} 
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </form>
            </>
          ) : (
            <div className="success-state">
              <div className="success-icon">✓</div>
              <h2>Report Submitted!</h2>
              <p>Thank you for contributing to community safety.</p>
              <button className="submit-btn" onClick={() => setIsSuccess(false)}>Submit Another Report</button>
            </div>
          )}
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .report-container {
            display: flex;
            justify-content: center;
            padding: 2rem;
            min-height: 100vh;
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            color: #f8fafc;
            font-family: 'Inter', sans-serif;
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 2.5rem;
            width: 100%;
            max-width: 640px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: fadeIn 0.5s ease-out;
          }
          .title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            background: linear-gradient(to right, #38bdf8, #818cf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .subtitle {
            color: #94a3b8;
            margin-bottom: 2rem;
          }
          .form-group {
            margin-bottom: 1.5rem;
            display: flex;
            flex-direction: column;
          }
          .form-row {
            display: flex;
            gap: 1rem;
          }
          .half { flex: 1; }
          label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #cbd5e1;
            margin-bottom: 0.5rem;
          }
          input, textarea {
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.875rem 1rem;
            color: #fff;
            outline: none;
            transition: all 0.2s ease;
          }
          input:focus, textarea:focus {
            border-color: #38bdf8;
            box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
          }
          .chip-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .chip {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 0.5rem 1rem;
            color: #cbd5e1;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .chip:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          .chip.selected {
            background: rgba(56, 189, 248, 0.2);
            border-color: #38bdf8;
            color: #38bdf8;
          }
          .location-input-wrapper {
            display: flex;
            gap: 0.5rem;
          }
          .location-input-wrapper input {
            flex: 1;
          }
          .btn-location {
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.3);
            color: #38bdf8;
            border-radius: 12px;
            padding: 0 1rem;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .btn-location:hover {
            background: rgba(56, 189, 248, 0.2);
          }
          .upload-area {
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 2rem;
            text-align: center;
            color: #94a3b8;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .upload-area:hover {
            border-color: #38bdf8;
            background: rgba(56, 189, 248, 0.05);
          }
          .upload-area span {
            color: #38bdf8;
            text-decoration: underline;
          }
          .toggle-group {
            flex-direction: row;
            align-items: center;
          }
          .toggle-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            cursor: pointer;
          }
          .toggle-label input {
            display: none;
          }
          .toggle-slider {
            width: 48px;
            height: 24px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            position: relative;
            transition: all 0.3s ease;
          }
          .toggle-slider::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 20px;
            height: 20px;
            background: #fff;
            border-radius: 50%;
            transition: all 0.3s ease;
          }
          .toggle-label input:checked + .toggle-slider {
            background: #38bdf8;
          }
          .toggle-label input:checked + .toggle-slider::after {
            transform: translateX(24px);
          }
          .submit-btn {
            width: 100%;
            background: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
            color: #fff;
            border: none;
            border-radius: 12px;
            padding: 1rem;
            font-size: 1.125rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
          }
          .submit-btn:hover:not(:disabled) {
            box-shadow: 0 10px 20px -10px rgba(56, 189, 248, 0.5);
            transform: translateY(-2px);
          }
          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }
          .success-state {
            text-align: center;
            padding: 3rem 1rem;
            animation: fadeIn 0.5s ease-out;
          }
          .success-icon {
            width: 80px;
            height: 80px;
            background: rgba(52, 211, 153, 0.2);
            color: #34d399;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            margin: 0 auto 1.5rem;
            border: 2px solid #34d399;
            box-shadow: 0 0 30px rgba(52, 211, 153, 0.3);
          }
          .success-state h2 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            color: #f8fafc;
          }
          .success-state p {
            color: #94a3b8;
            margin-bottom: 2rem;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </div>
    </AppShell>
  );
}
