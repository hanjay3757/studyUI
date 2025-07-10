import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h2 className="hero-title">
            Discover Amazing Shopping Experience
          </h2>
          <p className="hero-description">
            Explore hundreds of stores, restaurants, and entertainment options all under one roof. 
            Your perfect shopping destination awaits.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Explore Stores</button>
            <button className="btn-secondary">View Directory</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">
            <svg width="400" height="300" viewBox="0 0 400 300" fill="none">
              <rect width="400" height="300" fill="#f3f4f6" rx="12"/>
              <rect x="50" y="50" width="300" height="200" fill="#e5e7eb" rx="8"/>
              <circle cx="200" cy="120" r="30" fill="#d1d5db"/>
              <rect x="120" y="170" width="160" height="8" fill="#d1d5db" rx="4"/>
              <rect x="140" y="190" width="120" height="6" fill="#d1d5db" rx="3"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
