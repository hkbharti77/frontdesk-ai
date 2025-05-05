const express = require('express');
const cors = require('cors');
const { db } = require('./firebase');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const requestRoutes = require('./routes/requests');
app.use('/api/requests', requestRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



app.post('/simulate-call', async (req, res) => {
    const { question } = req.body;
    const knownAnswers = {
      'what are your hours': 'We are open from 9am to 5pm.',
      'where are you located': '123 Main St.',
    };
  
    const normalized = question.toLowerCase();
    if (knownAnswers[normalized]) {
      return res.send({ response: knownAnswers[normalized] });
    }
  
    // Escalate
    const resp = await fetch('http://localhost:5000/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
  
    res.send({ response: 'Let me check with my supervisor and get back to you.' });
  });
  

  const createToken = require('./token');

app.get('/livekit-token', (req, res) => {
  const identity = req.query.identity || 'customer';
  const room = req.query.room || 'salon';
  const token = createToken(identity, room);
  res.send({ token });
});

