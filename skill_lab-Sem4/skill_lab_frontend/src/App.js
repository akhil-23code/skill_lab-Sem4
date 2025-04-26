import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import logo from './assets/greenwatch-logo.png';

function MyButton({ text, onClick }) {
  return <button className="submit-button" onClick={onClick}>{text}</button>;
}

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

function App() {
  const [theme, setTheme] = useState('light');
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: '',
    location: ''
  });

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = () => {
    axios.get('http://localhost:3001/api/items')
      .then(res => setIssues(res.data))
      .catch(err => console.error('Error fetching issues:', err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (e) => {
    setFormData(prev => ({ ...prev, priority: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting form data:', formData);
      const res = await axios.post('http://localhost:3001/api/items', formData);
      setIssues(prev => [...prev, res.data]);
      setFormData({ title: '', description: '', category: '', priority: '', location: '' });
    } catch (err) {
      console.error('Error submitting issue:', err.response ? err.response.data : err.message);
      alert('Issue submission failed. Check console for error.');
    }
  };
  

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
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select category</option>
            <option value="Waste">Waste</option>
            <option value="Roads">Roads</option>
            <option value="Lighting">Lighting</option>
            <option value="Water">Water</option>
          </select>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <div className="priority-options">
            <label><input type="radio" name="priority" value="Low" checked={formData.priority === 'Low'} onChange={handlePriorityChange} /> Low</label>
            <label><input type="radio" name="priority" value="Medium" checked={formData.priority === 'Medium'} onChange={handlePriorityChange} /> Medium</label>
            <label><input type="radio" name="priority" value="High" checked={formData.priority === 'High'} onChange={handlePriorityChange} /> High</label>
          </div>
          <MyButton text="Submit" onClick={handleSubmit} />
        </div>

        <div className="issue-list">
          <div className="filters">
            <select><option>Filter by Status</option></select>
            <select><option>Filter by Category</option></select>
            <select><option>Filter by Priority</option></select>
          </div>

          {issues.map(issue => (
            <IssueCard
              key={issue._id}
              image={issue.image}
              title={issue.title}
              category={issue.category}
              priority={issue.priority}
              description={issue.description}
              status={issue.status}
              votes={issue.votes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
