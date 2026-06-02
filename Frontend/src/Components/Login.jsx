import { useState } from "react";
import "./../css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({
      email,
      password
    });

    // API Call Here
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">
          <div className="badge">Voice AI Platform</div>

          <h1>
            Welcome <span>Back</span>
          </h1>

          <p>
            Sign in to manage your wakewords and monitor voice activity.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Sign In
          </button>

        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <a href="/register">Create Account</a>
          </p>
        </div>

      </div>

    </div>
  );
}