# 🤖 Frontdesk AI Supervisor – Human-in-the-Loop System

This project simulates a smart AI receptionist that can handle customer calls, escalate unknown questions to a human supervisor, and learn from responses. Built with Node.js, React, Firebase, and LiveKit.

---

## 📦 Features

- 🔊 Audio call interface with LiveKit
- 🧠 AI simulation: answers known questions
- 📞 Escalates unknowns to a human supervisor
- 💬 Supervisor UI to view/respond to questions
- 📚 Updates knowledge base from supervisor input
- 🔁 Follows up with customer automatically

---

## 🧱 Tech Stack

| Feature                | Tech                                  |
|------------------------|---------------------------------------|
| Audio Calling          | [LiveKit](https://livekit.io)         |
| Frontend               | React + Tailwind CSS                  |
| Backend                | Node.js + Express                     |
| Database               | Firebase Firestore                    |
| Speech Recognition     | Web Speech API                        |
| Text-to-Speech         | Web SpeechSynthesis API               |

--

Create a .env in backend/:

env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_APP_ID=your_app_id
LK_API_KEY=your_livekit_api_key
LK_API_SECRET=your_livekit_api_secret
