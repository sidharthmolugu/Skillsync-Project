import React from 'react';

export default function CourseContent({ course, onBack }) {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: 'rgba(24,24,31,0.95)', borderRadius: 12, boxShadow: '0 2px 24px #000a', color: '#fff' }}>
      <button onClick={onBack} style={{ marginBottom: 16, background: '#2d3a4b', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Back to Dashboard</button>
      <h2 style={{ color: '#fff' }}>{course.title}</h2>
      <div style={{ marginTop: 24 }}>
        <h4 style={{ color: '#bfc7d5' }}>Course Content</h4>
        <p>{course.content || 'No content available yet.'}</p>
      </div>
    </div>
  );
}
