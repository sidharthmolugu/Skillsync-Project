import React from 'react';

export default function Courses({ courses, onEnroll, onBack }) {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #e0eafc' }}>
      <button onClick={onBack} style={{ marginBottom: 16, background: '#2d3a4b', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Back to Dashboard</button>
      <h2 style={{ color: '#2d3a4b' }}>All Courses</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.map(course => (
          <li key={course.id} style={{ marginBottom: 16, padding: 12, border: '1px solid #eee', borderRadius: 4, background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 500 }}>{course.title}</span>
            {course.enrolled ? (
              <span style={{ color: 'green' }}>Enrolled</span>
            ) : (
              <button onClick={() => onEnroll(course.id)} style={{ background: '#2d3a4b', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Enroll</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
