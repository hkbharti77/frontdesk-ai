const express = require('express');
const router = express.Router();
const { db } = require('../firebase');

// Create new help request
router.post('/', async (req, res) => {
  const { question } = req.body;
  const newRequest = {
    question,
    status: 'pending',
    createdAt: new Date(),
  };
  const doc = await db.collection('requests').add(newRequest);
  console.log(`SUPERVISOR ALERT: Hey, I need help answering: "${question}"`);
  res.send({ id: doc.id });
});

// Get all requests
router.get('/', async (req, res) => {
  const snapshot = await db.collection('requests').get();
  const requests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.send(requests);
});

// Respond to request
router.post('/:id/respond', async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  await db.collection('requests').doc(id).update({
    answer,
    status: 'resolved',
    resolvedAt: new Date(),
  });

  console.log(`CALLBACK TO CUSTOMER: ${answer}`);
  res.send({ message: 'Response submitted.' });
});

module.exports = router;
