
import { useState } from "react";
import "./../css/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <a href="/" style={{ textDecoration: "none" }}  className="logo-link">
          Picovoice
        </a>
      </div>

      {/* CENTER NAV (ALWAYS DESKTOP VISIBLE) */}
      <ul className="nav-links desktop-only">

        <li onMouseEnter={() => setActiveMenu("products")}
            onMouseLeave={() => setActiveMenu(null)}>
          Products ⌵
          {activeMenu === "products" && (
            <div className="dropdown two-col">
              <div>
                <h4>Voice</h4>
                <p>Speech Recognition</p>
                <p>Wake Word</p>
              </div>
              <div>
                <h4>Vision</h4>
                <p>Image Detection</p>
                <p>Object Tracking</p>
                <h4>Language</h4>
                <p>NLP Engine</p>
                <p>Translation</p>
              </div>
            </div>
          )}
        </li>

        <li onMouseEnter={() => setActiveMenu("tech")}
            onMouseLeave={() => setActiveMenu(null)}>
          Technologies ⌵
          {activeMenu === "tech" && (
            <div className="dropdown single-col">
              <p>picoGym</p>
              <p>picoCompression</p>
              <p>picoInference</p>
            </div>
          )}
        </li>

        <li onMouseEnter={() => setActiveMenu("cookbook")}
            onMouseLeave={() => setActiveMenu(null)}>
          Cookbook ⌵
          {activeMenu === "cookbook" && (
            <div className="dropdown two-col big">
              <div>
                <p>AI Call Screening</p>
                <p>Personalized Wake Word</p>
                <p>Live Captioning & Translation</p>
                <p>Speech-to-Speech Translation</p>
              </div>
              <div>
                <p>LLM Voice AI Agent</p>
                <p>Speaker-aware Assistant</p>
                <p>RAG Voice QA</p>
              </div>
            </div>
          )}
        </li>

        <li>Docs</li>
      </ul>

      {/* RIGHT ACTIONS (DESKTOP ONLY) */}
      <div className="actions desktop-only">
        <Link to="/login" className="login" style={{textDecoration : "none"}}>Login</Link>
        <button className="start">Start Free</button>
        <button className="contact">Contact Sales</button>
      </div>

      {/* HAMBURGER (MOBILE ONLY) */}
      <div className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? "✕" : "☰"}
      </div>

      {/* MOBILE MENU ONLY */}
      <ul className={`mobile-menu ${mobileOpen ? "open" : ""}`}>

        <li>Products</li>
        <li>Technologies</li>
        <li>Cookbook</li>
        <li>Docs</li>

        <div className="mobile-actions" >
         <Link to="/login" className="login">Login</Link>
          <button className="start">Start Free</button>
          <button className="contact">Contact Sales</button>
        </div>
      </ul>
    </nav>
  );
}