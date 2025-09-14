import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


const mockCourses = [
  { id: 1, title: 'frontend Basics', content: 'Learn the basics of React, including components, state, and props.' },
  { id: 2, title: 'Express API', content: 'Build RESTful APIs with Express.js and Node.js.' },
  { id: 3, title: 'Full Stack Project', content: 'Combine React and Express to build a full-stack project.' },
  { id: 4, title: 'Operating Systems', content: 'Understand OS concepts: processes, memory management, scheduling, and file systems.' },
  { id: 5, title: 'Databases', content: 'Learn about relational databases, SQL, normalization, and transactions.' },
  { id: 6, title: 'Networking', content: 'Explore computer networking fundamentals: TCP/IP, routing, switching, and protocols.' },
  { id: 7, title: 'Data Structures', content: 'Study arrays, linked lists, trees, graphs, stacks, queues, and their algorithms.' },
];

app.get('/', (req, res) => {
  res.send('LMS Express Server Running');
});

app.get('/api/courses', (req, res) => {
  res.json(mockCourses);
});

app.post('/api/enroll', (req, res) => {
  const { courseId } = req.body;
  if (!courseId) return res.status(400).json({ error: 'Missing courseId' });
  // In a real app, update DB here
  res.json({ success: true, courseId });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
