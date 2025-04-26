import React, { useState } from 'react';
import './App.css';
import logo from './assets/greenwatch-logo.png';

// MyButton Component
function MyButton({ text }) {
  return <button className="submit-button">{text}</button>;
}

// IssueCard Component
function IssueCard({ image, title, category, priority, description, status, votes }) {
  return (
    <div className="issue-card">
      <img src={image} alt={title} className="issue-image" />
      <div className="issue-info">
        <h3>{title}</h3>
        <div className="tags">
          <span className="tag">{category}</span>
          <span className="tag-priority">{priority}</span>
        </div>
        <p>{description}</p>
        <div className="status-vote">
          <div className="status">{status}</div>
          <div className="votes">👍 {votes}</div>
        </div>
      </div>
    </div>
  );
}

// App Component
function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`container ${theme}`}>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Greenwatch Logo" className="logo" />
          <h1>GREENWATCH</h1>
        </div>
        <nav>
          <a href="#">All Issues</a>
          <a href="#">Submit Issue</a>
          <a href="#">Login</a>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </nav>
      </header>

      <div className="main-content">
        <div className="report-form">
          <h2>Report an Issue</h2>
          <input type="text" placeholder="Title" />
          <textarea placeholder="Description"></textarea>
          <select>
            <option>Select category</option>
          </select>
          <input type="file" />
          <input type="text" placeholder="Location" />
          <div className="priority-options">
            <label><input type="radio" name="priority" /> Low</label>
            <label><input type="radio" name="priority" /> Medium</label>
            <label><input type="radio" name="priority" /> High</label>
          </div>
          <MyButton text="Submit" />
        </div>

        <div className="issue-list">
          <div className="filters">
            <select><option>Filter by Status</option></select>
            <select><option>Filter by Category</option></select>
            <select><option>Filter by Priority</option></select>
          </div>

          <IssueCard
            image="https://via.placeholder.com/100"
            title="Illegal dumping"
            category="Waste"
            priority="High"
            description="Large pile of trash dumped by the roadside."
            status="OPEN"
            votes={12}
          />
          <IssueCard
            image="https://via.placeholder.com/100"
            title="Pothole"
            category="Roads"
            priority="Medium"
            description="A deep pothole on Elm Street."
            status="IN-PROGRESS"
            votes={8}
          />
          <IssueCard
            image="https://via.placeholder.com/100"
            title="Broken streetlight"
            category="Lighting"
            priority="Low"
            description="Streetlight not working for over a week."
            status="RESOLVED"
            votes={5}
          />
          <IssueCard
            image="https://via.placeholder.com/100"
            title="Sewage leak"
            category="Water"
            priority="High"
            description="Sewage leaking into the stream."
            status="OPEN"
            votes={3}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
