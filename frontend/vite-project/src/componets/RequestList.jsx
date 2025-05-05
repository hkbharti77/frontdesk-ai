import React, { useEffect, useState } from 'react';

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const [answers, setAnswers] = useState({});

  const fetchRequests = async () => {
    const res = await fetch('http://localhost:5000/api/requests');
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const submitAnswer = async (id) => {
    await fetch(`http://localhost:5000/api/requests/${id}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: answers[id] }),
    });
    fetchRequests();
  };

  return (
    <div>
      {requests.map(req => (
        <div key={req.id} className="border p-4 mb-2 rounded">
          <p><strong>Q:</strong> {req.question}</p>
          <p>Status: {req.status}</p>
          {req.status === 'pending' && (
            <>
              <input
                className="border p-1 mt-2"
                placeholder="Answer..."
                onChange={e => setAnswers({ ...answers, [req.id]: e.target.value })}
              />
              <button
                onClick={() => submitAnswer(req.id)}
                className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
              >
                Submit
              </button>
            </>
          )}
          {req.status === 'resolved' && <p><strong>Answer:</strong> {req.answer}</p>}
        </div>
      ))}
    </div>
  );
}
