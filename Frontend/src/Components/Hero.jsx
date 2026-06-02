
// import { useState, useRef } from "react";
// import "./../css/Hero.css";
// import Dashboard from "./Dashboard";


// export default function Hero() {
//   const [language, setLanguage] = useState("English");
//   const [word, setWord] = useState("Hello Computer");

//   const [isRecording, setIsRecording] = useState(false);

//   // TRAINING
//   const [isTraining, setIsTraining] = useState(false);
//   const [trainingTime, setTrainingTime] = useState("0ms");

//   // STATUS
//   const [statusText, setStatusText] = useState("Mic Off");

//   // DETECTION
//   const [detectedText, setDetectedText] = useState("");

//   const mediaRecorderRef = useRef(null);
//   const recognitionRef = useRef(null);

//   // prevent repeated spam detection
//   const lastDetectedRef = useRef(0);

//   async function sendStatus(status) {
//     try {
//       await fetch("http://localhost:5000/voice-status", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           recording: status
//         })
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function startWakeWordDetection() {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Speech Recognition not supported in this browser");
//       return;
//     }

//     const recognition = new SpeechRecognition();

//     recognition.continuous = true;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       const cleanWakeWord = word.trim().toLowerCase();

//       // get latest transcript chunk
//       const resultIndex = event.results.length - 1;
//       const transcript = event.results[resultIndex][0].transcript
//         .trim()
//         .toLowerCase();

//       /**
//        * FIX:
//        * instead of exact match, we check:
//        * - includes wakeword
//        * - prevents spam with cooldown
//        */
//       const now = Date.now();
//       const cooldown = 2000;

//       if (
//         transcript.includes(cleanWakeWord) &&
//         now - lastDetectedRef.current > cooldown
//       ) {
//         lastDetectedRef.current = now;

//         setDetectedText(`${word} detected!`);

//         setTimeout(() => {
//           setDetectedText("");
//         }, 2500);
//       }
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   }

//   async function toggleRecording() {
//     try {
//       if (!isRecording && !isTraining) {
//         console.log("mic clicked")
//         setIsTraining(true);
//         setStatusText("Training the model...");
//         setTrainingTime("0ms");
//         setDetectedText("");

//         const finalTime = Math.floor(Math.random() * 1000) + 2000;

//         let currentTime = 0;

//         const interval = setInterval(() => {
//           currentTime += Math.floor(Math.random() * 140) + 50;

//           if (currentTime >= finalTime) {
//             currentTime = finalTime;
//           }

//           if (currentTime < 1000) {
//             setTrainingTime(`${currentTime}ms`);
//           } else {
//             setTrainingTime(`${(currentTime / 1000).toFixed(2)}s`);
//           }
//         }, 60);

//         setTimeout(async () => {
//           clearInterval(interval);

//           const stream = await navigator.mediaDevices.getUserMedia({
//             audio: true
//           });

//           const mediaRecorder = new MediaRecorder(stream);
//           mediaRecorderRef.current = mediaRecorder;

//           mediaRecorder.start();

//           startWakeWordDetection();

//           setIsTraining(false);
//           setIsRecording(true);

//           setStatusText("Now mic is listening, you can test it now");

//           sendStatus(true);
//         }, finalTime);
//       } else if (isRecording) {
//         mediaRecorderRef.current?.stop();
//         recognitionRef.current?.stop();

//         setIsRecording(false);
//         setTrainingTime("0ms");
//         setStatusText("Mic Off");
//         setDetectedText("");

//         sendStatus(false);
//       }
//     } catch (err) {
//       console.error("Mic Error:", err);
//       alert("Microphone not available or permission denied");
//     }
//   }

//   return (
//     <section className="hero">

//       {/* LEFT */}
//       <div className="hero-left">

//         <div className="badge">Porcupine Wake Word</div>

//         <h1>
//           Fast, lightweight <span>custom wake word detection</span>
//         </h1>

//         <p className="subtext">
//           Train custom wake words in seconds and deploy across embedded, mobile, web, desktop, or server.
//         </p>

//         <p className="desc">
//           Enterprise-ready. No training data required. Built for production voice interfaces.
//         </p>

//         <div className="hero-buttons">
//           <button className="primary">Start Free</button>
//           <button className="secondary">Talk to Sales</button>
//         </div>

//       </div>

//       {/* RIGHT */}
//       <div className="hero-right">

//         <div className="card">

//           <h2>Wake Word Studio</h2>

//           <p className="card-desc">
//             Test custom wake words instantly in the browser.
//           </p>

//           <label>Language</label>
//           <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//             <option>English</option>
//             <option>Spanish</option>
//             <option>French</option>
//             <option>German</option>
//             <option>Hindi</option>
//             <option>Japanese</option>
//           </select>

//           <label>Wake Word</label>
//           <input
//             type="text"
//             value={word}
//             onChange={(e) => setWord(e.target.value)}
//           />

//           <p className="hint">
//             Click mic to train & test detection for <span>“{word}”</span>
//           </p>

//           {/* MIC UI */}
//           <div className="mic-wrapper">
//             <div className="mic-ring" onClick={toggleRecording}>
//               <div className="mic-core">
//                 <span className="mic-icon">🎙</span>
//               </div>
//             </div>
//           </div>

//           {/* TRAINING TIMER */}
//           {isTraining && (
//             <p className="hint" style={{ textAlign: "center" }}>
//               Training the model... {trainingTime}
//             </p>
//           )}

//           {/* STATUS TEXT */}
//           {!isTraining && (
//             <p className="hint" style={{ textAlign: "center" }}>
//               {statusText}
//             </p>
//           )}

//           {/* DETECTED TEXT */}
//           {detectedText && (
//             <p
//               className="hint"
//               style={{
//                 textAlign: "center",
//                 color: "#4fda5b",
//                 fontWeight: "600",
//                 marginTop: "10px"
//               }}
//             >
//               {detectedText}
//             </p>
//           )}

//         </div>

//       </div>

//           {/* <Dashboard/> */}
//     </section>
//   );
// }







import { useState, useRef } from "react";
import "./../css/Hero.css";
import Dashboard from "./Dashboard";
import UserDashboard from "./UserDashboard";
import { Link } from "react-router-dom";


export default function Hero() {
  const [language, setLanguage] = useState("English");
  const [word, setWord] = useState("Hello Computer");

  const [isRecording, setIsRecording] = useState(false);

  const [isTraining, setIsTraining] = useState(false);
  const [trainingTime, setTrainingTime] = useState("0ms");

  const [statusText, setStatusText] = useState("Mic Off");
  const [detectedText, setDetectedText] = useState("");

  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastDetectedRef = useRef(0);

  async function sendStatus(status) {
    try {
      await fetch("http://localhost:5000/voice-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recording: status })
      });
    } catch (err) {
      console.error(err);
    }
  }

  /* ✅ NEW: send wakeword to backend */
  // async function sendWakeword(wakeword) {
  //   try {
  //     await fetch("http://localhost:5000/wakeword", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         wakeword,
  //         time: new Date().toISOString()
  //       })
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
async function sendWakeword(wakeword) {
  try {
    console.log("SENDING WAKEWORD:", wakeword);

    await fetch("http://localhost:5000/voice-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recording: true,
        wakeword: wakeword.trim()
      })
    });
  } catch (err) {
    console.error(err);
  }
}

  async function startWakeWordDetection() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const cleanWakeWord = word.trim().toLowerCase();

      const resultIndex = event.results.length - 1;
      const transcript = event.results[resultIndex][0].transcript
        .trim()
        .toLowerCase();

      const now = Date.now();
      const cooldown = 2000;

      if (
        transcript.includes(cleanWakeWord) &&
        now - lastDetectedRef.current > cooldown
      ) {
        lastDetectedRef.current = now;

        setDetectedText(`${word} detected!`);

        /* ✅ IMPORTANT FIX */
        sendWakeword(word);

        setTimeout(() => {
          setDetectedText("");
        }, 2500);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  }

  async function toggleRecording() {
    try {
      if (!isRecording && !isTraining) {
        setIsTraining(true);
        setStatusText("Training the model...");
        setTrainingTime("0ms");
        setDetectedText("");

        const finalTime = Math.floor(Math.random() * 1000) + 2000;
        let currentTime = 0;

        const interval = setInterval(() => {
          currentTime += Math.floor(Math.random() * 140) + 50;

          if (currentTime >= finalTime) currentTime = finalTime;

          if (currentTime < 1000) setTrainingTime(`${currentTime}ms`);
          else setTrainingTime(`${(currentTime / 1000).toFixed(2)}s`);
        }, 60);

        setTimeout(async () => {
          clearInterval(interval);

          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
          });

          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;

          mediaRecorder.start();
          startWakeWordDetection();

          setIsTraining(false);
          setIsRecording(true);
          setStatusText("Now mic is listening");

          sendStatus(true);
        }, finalTime);
      } else if (isRecording) {
        mediaRecorderRef.current?.stop();
        recognitionRef.current?.stop();

        setIsRecording(false);
        setTrainingTime("0ms");
        setStatusText("Mic Off");
        setDetectedText("");

        sendStatus(false);
      }
    } catch (err) {
      console.error("Mic Error:", err);
      alert("Microphone not available or permission denied");
    }
  }

  return (
    <section className="hero">

      <div className="hero-left">
        <div className="badge">Porcupine Wake Word</div>

        <h1>
          Fast, lightweight <span>custom wake word detection</span>
        </h1>

        <p className="subtext">
          Train custom wake words in seconds and deploy everywhere.
        </p>

        <p className="desc">
          Enterprise-ready voice interface system.
        </p>

        <div className="hero-buttons">
          <button className="primary">Start Free</button>
          <button className="secondary">Talk to Sales</button>
          {/* <button className="primary"><a href="/admin-dashboard" className="admin-button" style={{color: "wheat", padding: "40px"}}>Go to Admin dashboard</a></button>
          <Link to="/UserDashboard" className="primary"> Go to User dashboard </Link> */}
          {/* <button className="primary w-full sm:w-auto"> Go to Admin dashboard</button> */}
          <Link to="/admin-dashboard" className="primary w-full sm:w-auto block text-center">
            Go to Admin dashboard
          </Link>
          <Link to="/UserDashboard" className="primary w-full sm:w-auto block text-center">
            Go to User dashboard
          </Link>
        </div>
      </div>

      <div className="hero-right">
        <div className="card">

          <h2>Wake Word Studio</h2>

          <p className="card-desc">
            Test custom wake words instantly.
          </p>

          <label>Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Hindi</option>
            <option>Japanese</option>
          </select>

          <label>Wake Word</label>
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />

          <p className="hint">
            Click mic to train & test for <span>“{word}”</span>
          </p>

          <div className="mic-wrapper">
            <div className="mic-ring" onClick={toggleRecording}>
              <div className="mic-core">
                <span className="mic-icon">🎙</span>
              </div>
            </div>
          </div>

          {isTraining && (
            <p className="hint" style={{ textAlign: "center" }}>
              Training... {trainingTime}
            </p>
          )}

          {!isTraining && (
            <p className="hint" style={{ textAlign: "center" }}>
              {statusText}
            </p>
          )}

          {detectedText && (
            <p className="hint" style={{ textAlign: "center", color: "#4fda5b" }}>
              {detectedText}
            </p>
          )}

        </div>
      </div>

    </section>
  );
}