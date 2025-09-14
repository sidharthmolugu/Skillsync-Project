import React from 'react';

export default function Courses({ courses, onEnroll, onBack }) {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: 'rgba(24,24,31,0.95)', borderRadius: 12, boxShadow: '0 2px 24px #000a' }}>
      <button onClick={onBack} style={{ marginBottom: 16, background: '#2d3a4b', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Back to Dashboard</button>
      <h2 style={{ color: '#fff' }}>All Courses</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.map(course => (
          <li key={course.id} style={{ marginBottom: 16, padding: 12, border: '1px solid #333', borderRadius: 4, background: 'rgba(36,36,48,0.95)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
            <span style={{ fontWeight: 500 }}>{course.title}</span>
            {course.enrolled ? (
              <span style={{ color: '#7fff7f' }}>Enrolled</span>
            ) : (
              <button onClick={() => onEnroll(course.id)} style={{ background: '#2d3a4b', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Enroll</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
