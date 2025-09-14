import React from 'react';

export default function CourseContent({ course, onBack }) {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #e0eafc' }}>
      <button onClick={onBack} style={{ marginBottom: 16, background: '#2d3a4b', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Back to Dashboard</button>
      <h2 style={{ color: '#2d3a4b' }}>{course.title}</h2>
      <div style={{ marginTop: 24 }}>
        <h4>Course Content</h4>
        <p>{course.content || 'No content available yet.'}</p>
      </div>
    </div>
  );
}
