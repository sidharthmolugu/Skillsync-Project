import React from 'react';

export default function Dashboard({ username, onLogout, onSelectCourse, courses }) {
  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #e0eafc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: '#2d3a4b' }}>SkillSync Dashboard</h2>
        <button onClick={onLogout} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer' }}>Logout</button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <span>Welcome, <b>{username}</b>!</span>
      </div>
      <h3>My Courses</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {courses.length === 0 && <li>No courses enrolled yet.</li>}
        {courses.map(course => (
          <li key={course.id} style={{ marginBottom: 16, padding: 12, border: '1px solid #eee', borderRadius: 4, background: '#fafbfc', cursor: 'pointer' }} onClick={() => onSelectCourse(course)}>
            <span style={{ fontWeight: 500 }}>{course.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
