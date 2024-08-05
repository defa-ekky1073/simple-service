import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch('/api/message')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  const incrementCount = () => {
    fetch('/api/increment', { method: 'POST' })
      .then(response => response.json())
      .then(data => setCount(data.count));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi-Container App</h1>
        <p>Message from backend: {message}</p>
        <p>Count: {count}</p>
        <button onClick={incrementCount}>Increment</button>
      </header>
    </div>
  );
}

export default App;