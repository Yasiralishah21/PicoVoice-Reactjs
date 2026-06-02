//app.jsx3
import { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";

/* components */
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import UserDashboard from "./Components/UserDashboard";
import Login from "./Components/Login";

function App() {
  const [isRecording, setIsRecording] = useState(false); // Used to store values that can change. MEANS Microphone OFF
  const mediaRecorderRef = useRef(null); //Stores a value without causing re-renders.

  async function sendStatus(recording, wakeword = null) {
    try {
      const cleanWakeword =
        typeof wakeword === "string" && wakeword.trim() !== "" // checks two things : Is wakeword a string? and Removes spaces and checks it's not empty.
          ? wakeword.trim()
          : null;

      //Calls backend.
      await fetch("http://localhost:5000/voice-status", { 
        method: "POST", //Using POST request. (create)
        headers: { "Content-Type": "application/json" }, // Convert JS object into JSON string.
        body: JSON.stringify({
          recording,
          wakeword: cleanWakeword
        })
      });
    } catch (err) {
      console.error(err); // If backend fails: Network Error it gets printed.
    }
  }

  // Main microphone button logic.
  async function toggleRecording() {
    try {
      // Checks if browser supports microphone access.
      if (!navigator.mediaDevices?.getUserMedia) return;

      // Currently NOT recording
      if (!isRecording) {
        // Request Mic Access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        //If user accepts:
        // Create Recorder
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder; //Store Recorder

        //Start Recording
        mediaRecorder.start();
        // Update State
        setIsRecording(true);

        //sendStatus(true);
        sendStatus(true);

        //Fake Wakeword - Run code later.
        //Recording starts
        //   ↓ 
        // wait 2 seconds
        //   ↓
        // send wakeword
       setTimeout(() => {
  sendStatus(null, "hey pico"); 
}, 2000);


      } else { //Already recording
        mediaRecorderRef.current?.stop(); // Stop Recorder
        setIsRecording(false); //Recording OFF.

        sendStatus(false); // Backend creates: SESSION_END
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Hero //Hero receives: isRecording and toggleRecording()
              isRecording={isRecording}
              toggleRecording={toggleRecording}
            />
          }
        />

        <Route path="/admin-dashboard" element={<Dashboard sendStatus={sendStatus} />} />
        <Route path="/UserDashboard" element={<UserDashboard/>} />
        <Route path="/Login" element={<Login />} />
        {/* IMPORTANT: this catches /anything else */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;