import { useEffect, useState } from "react";
import "./../css/user-Dashboard.css";


export default function UserDashboard() {
  const MAX_WAKEWORDS = 10;

  const [userData, setUserData] = useState({
    userId: "",
    wakewords: []
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with your actual endpoint
        const res = await fetch("http://localhost:5000/user-wakewords");
        const result = await res.json();

        setUserData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const trainedCount = userData.wakewords.length;
  const remainingCount = MAX_WAKEWORDS - trainedCount;
  const progress = (trainedCount / MAX_WAKEWORDS) * 100;

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="header">
        <h1>🎙️ My Wakewords</h1>
        <p>Manage and monitor your trained wakewords</p>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="card gradient-card" style={{border : "4px solid rgb(212, 0, 255)", height : "100%"}}>
          <h2>{trainedCount}</h2>
          <p>Wakewords Trained</p>
        </div>

        <div className="card gradient-card" style={{border : "3px solid rgb(212, 0, 255)", height : "90%"}}>
          <h2>{remainingCount}</h2>
          <p>Remaining Slots</p>
        </div>

        <div className="card gradient-card" style={{border : "2px solid rgb(212, 0, 255)", height : "90%"}}>
          <h2>{MAX_WAKEWORDS}</h2>
          <p>Training Limit</p>
        </div>
      </div>

      {/* PROGRESS SECTION */}
      <div className="table-container gradient-box">
        <h2>📈 Training Progress</h2>

        <div
          style={{
            background: "#1e1e2f",
            borderRadius: "20px",
            overflow: "hidden",
            height: "20px",
            marginTop: "15px"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, #7f5af0, #2cb67d)",
              transition: "0.5s"
            }}
          />
        </div>

        <p
          style={{
            marginTop: "10px",
            color: "#fff"
          }}
        >
          {trainedCount} / {MAX_WAKEWORDS} wakewords used
        </p>
      </div>

      {/* WAKEWORDS TABLE */}
      <div className="table-container gradient-box">
        <h2>🎤 Trained Wakewords</h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>WAKEWORD</th>
              <th>TRAINED DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {userData.wakewords.length === 0 ? (
              <tr>
                <td colSpan="4">No wakewords trained yet</td>
              </tr>
            ) : (
              userData.wakewords.map((word, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{word.wakeword}</td>
                  <td>
                    {new Date(word.createdAt).toLocaleString()}
                  </td>
                  <td>
                    <span
                      style={{
                        color: "#2cb67d",
                        fontWeight: "bold"
                      }}
                    >
                      Active
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* LIMIT WARNING */}
      {remainingCount <= 2 && (
        <div
          className="gradient-box"
          style={{
            marginTop: "20px",
            padding: "20px",
            textAlign: "center",
            color: "#ffb703"
          }}
        >
          ⚠️ You only have{" "}
          <strong>{remainingCount}</strong> wakeword
          slots remaining.
        </div>
      )}
    </div>
  );
}