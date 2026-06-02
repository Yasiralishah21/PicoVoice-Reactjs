// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// // import App from './App.jsx'
// import Navbar from './Components/Navbar.jsx'
// import Hero from './Components/Hero.jsx'
// import { BrowserRouter } from "react-router-dom";
// import Dashboard from './Components/Dashboard.jsx'
// // import HeroTwo from './Components/Herotwo.jsx'

// createRoot(document.getElementById('root')).render(
//     <BrowserRouter>
//   <StrictMode>
//     <Navbar/>
//     {/* <Hero/> */}
//     {/* <Dashboard/> */}
//     {/* <HeroTwo/> */}
//     <App />
//   </StrictMode>,
//   </BrowserRouter>
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);



/*
 ----------------------------------  THE APP IS DETECTOR NOW, ADD PICOLLM TO MAKE IT YOUR ASSISTANT. (https://picovoice.ai/docs/picollm/)  --------------------------------------------------

It completely makes sense why you're scratching your head here. Right now, your app is a detector—it listens for "Hello Yasir," notes the time, logs it to your dashboard, and then... stops. It’s essentially a smart doorbell that logs when someone rings it.
picoLLM is the actual "brain" that turns your app from a basic detector into a local, private Alexa or Siri. Instead of just logging the wake word and sitting there, picoLLM steps in after the wake word is detected to understand and answer the user's questions.
Here is exactly how it fits into your current setup.

The Shift: From "Detector" to "Assistant"
Right now, your flow looks like this:
1. User says: "Hello Yasir."
2. Porcupine detects it.
3. Terminal & Dashboard log: Wake word detected at 12:00 PM.
4. End of story.

With picoLLM, the flow evolves into a conversation:
1. User says: "Hello Yasir, what is the capital of France?"
2. Porcupine detects "Hello Yasir" and alerts your app.
3. Your app starts recording the rest of the sentence: "what is the capital of France?"
4. A Speech-to-Text tool (like Picovoice Cheetah) turns that audio into text: "what is the capital of France?"
5. [picoLLM enters here] You pass that text to picoLLM on your backend.
6. picoLLM processes it locally and generates the text response: "The capital of France is Paris."
7. Your Admin Dashboard displays the answer (and optionally, a Text-to-Speech tool speaks it back).

Where does picoLLM live in your code?
Because picoLLM is a Large Language Model, it is heavy. You do not want to run it directly inside your React frontend (Hero.jsx) because it will slow down the browser.
Instead, it lives in your Node.js/Express backend, and your React frontend talks to it via an API endpoint.
Here is the architecture of how they will interact:


[ React Frontend (Hero.jsx) ]
       │
       │  1. "Hello Yasir" detected!
       ▼
[ Node.js Backend (server.js) ] ──▶ Logs to Admin Dashboard (Start/End time)
       │
       │  2. Frontend sends user's question: "What is React?"
       ▼
[ picoLLM (Running Locally) ]   ──▶ Processes prompt entirely offline
       │
       │  3. Generates response: "React is a JavaScript library..."
       ▼
[ React Frontend (Hero.jsx) ] ──▶ Displays the AI's answer on your screen


What you need to do next
To make this work, you need to transition your frontend from just listening for the wake word to capturing the user's question right after the wake word is triggered.
If you want to see exactly how to wire this up, paste your current Hero.jsx code (or whichever file handles your Porcupine wake-word detection). I can show you exactly where the wake-word trigger ends and where the picoLLM request should begin!
*/