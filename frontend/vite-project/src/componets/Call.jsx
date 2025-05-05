import React, { useEffect, useRef, useState } from 'react';
import { connect, Room } from 'livekit-client';

export default function CallComponent() {
  const room = useRef(null);
  const [joined, setJoined] = useState(false);
  const [transcript, setTranscript] = useState('');

  const connectRoom = async () => {
    const res = await fetch('http://localhost:5000/livekit-token?identity=customer');
    const { token } = await res.json();

    room.current = await connect('wss://your-livekit-server.livekit.cloud', token, {
      autoSubscribe: true,
    });

    setJoined(true);
    startTranscription();
  };

  const startTranscription = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = async (event) => {
      const last = event.results.length - 1;
      const spokenText = event.results[last][0].transcript;
      setTranscript(spokenText);

      const res = await fetch('http://localhost:5000/simulate-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: spokenText }),
      });

      const data = await res.json();
      speakResponse(data.response);
    };

    recognition.start();
  };

  const speakResponse = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={connectRoom}
        disabled={joined}
      >
        {joined ? 'Connected' : 'Start Call'}
      </button>
      <p className="mt-2">Transcript: {transcript}</p>
    </div>
  );
}
