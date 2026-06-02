import { useEffect, useState } from "react";
import "./../css/Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState({
    sessions: [],
    queue: [],
    wakewords: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/debug-state");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const buildSessions = (queue) => {
    const sessions = [];
    let current = null;
    let sessionCount = 1;

    for (const item of queue) {
      if (item.type === "SESSION_START") {
        current = {
          id: `Session-${String(sessionCount).padStart(2, "0")}`,
          user: item.userId,
          wakeword: "Hello Computer",
          start: item.time,
          end: "-"
        };
      }

      if (item.type === "WAKEWORD" && current) {
        current.wakeword = item.wakeword;
      }

      if (item.type === "SESSION_END" && current) {
        current.end = item.time;
        sessions.push(current);
        current = null;
        sessionCount++;
      }
    }

    return sessions.reverse();
  };

  const sessions = buildSessions(data.queue);

  return (
    <div className="dashboard">

      <div className="header">
        <h1>🎤 Voice AI Dashboard</h1>
        <p>Session-based Live Monitoring</p>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="card gradient-card">
          <h2>{sessions.length}</h2>
          <p>Sessions</p>
        </div>

        <div className="card gradient-card">
          <h2>{data.queue.length}</h2>
          <p>Events</p>
        </div>

        <div className="card gradient-card">
          <h2>{data.wakewords.length}</h2>
          <p>Wakewords</p>
        </div>
      </div>

      {/* SESSION TABLE */}
      <div className="table-container gradient-box">
        <h2>📥 LIVE SESSIONS</h2>

        <table>
          <thead>
            <tr>
              <th>SESSION</th>
              <th>USER</th>
              <th>WAKEWORD</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th>DURATION</th>
            </tr>
          </thead>

          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan="6">No sessions yet</td>
              </tr>
            ) : (
              sessions.map((s, i) => {
                const duration =
                  s.end !== "-" && s.start
                    ? `${((new Date(s.end) - new Date(s.start)) / 1000).toFixed(2)}s`
                    : "-";

                return (
                  <tr key={i}>
                    <td>{s.id}</td>
                    <td>{s.user}</td>
                    <td>{s.wakeword !== "Hello Computer" ? `${s.wakeword}` : "Hello Computer"}</td>
                    <td>{s.start}</td>
                    <td>{s.end}</td>
                    <td>{duration}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}