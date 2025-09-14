import React from 'react';



function MeshBackground() {
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }} width="100%" height="100%" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mesh1" cx="20%" cy="30%" r="60%" fx="20%" fy="30%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#18181f" stopOpacity="0.1"/>
        </radialGradient>
        <radialGradient id="mesh2" cx="80%" cy="70%" r="60%" fx="80%" fy="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#18181f" stopOpacity="0.1"/>
        </radialGradient>
        <radialGradient id="mesh3" cx="60%" cy="20%" r="40%" fx="60%" fy="20%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#18181f" stopOpacity="0.1"/>
        </radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#mesh1)"/>
      <rect width="1920" height="1080" fill="url(#mesh2)" opacity="0.7"/>
      <rect width="1920" height="1080" fill="url(#mesh3)" opacity="0.5"/>
    </svg>
  );
}

export default function LandingPage({ onStart }) {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#18181f', overflow: 'hidden' }}>
      <MeshBackground />
      <h1 style={{ fontSize: 48, color: '#fff', marginBottom: 16, zIndex: 1 }}>Welcome to SkillSync</h1>
      <p style={{ fontSize: 20, color: '#bfc7d5', marginBottom: 32, zIndex: 1 }}>Your platform for modern learning and course management.</p>
      <button onClick={onStart} style={{ fontSize: 20, padding: '12px 36px', borderRadius: 8, background: '#2d3a4b', color: '#fff', border: 'none', cursor: 'pointer', zIndex: 1 }}>
        Get Started
      </button>
    </div>
  );
}
