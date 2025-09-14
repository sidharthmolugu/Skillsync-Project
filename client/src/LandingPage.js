import React from 'react';

export default function LandingPage({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(120deg,#e0eafc,#cfdef3)' }}>
      <h1 style={{ fontSize: 48, color: '#2d3a4b', marginBottom: 16 }}>Welcome to SkillSync</h1>
      <p style={{ fontSize: 20, color: '#4b5d6b', marginBottom: 32 }}>Your platform for modern learning and course management.</p>
      <button onClick={onStart} style={{ fontSize: 20, padding: '12px 36px', borderRadius: 8, background: '#2d3a4b', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Get Started
      </button>
    </div>
  );
}
