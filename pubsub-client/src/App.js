import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [topicId, setTopicId] = useState('');
  const [subscriberId, setSubscriberId] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('http://localhost:3000/subscribe', { topicId, subscriberId });
      setMessages(prevMessages => [...prevMessages, response.data]);
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, 'Failed to subscribe']);
    }
  };

  const handleNotify = async () => {
    try {
      const response = await axios.post('http://localhost:3000/notify', { topicId });
      setMessages(prevMessages => [...prevMessages, response.data]);
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, 'Failed to notify']);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.post('http://localhost:3000/unsubscribe', { topicId, subscriberId });
      setMessages(prevMessages => [...prevMessages, response.data]);
    } catch (error) {
      setMessages(prevMessages => [...prevMessages, 'Failed to unsubscribe as no such subscriber found']);
    }
  };

  return (
    <div className="App">
      <h1>Publisher Subscriber System</h1>
      <div>
        <input
          type="text"
          placeholder="Topic ID"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subscriber ID"
          value={subscriberId}
          onChange={(e) => setSubscriberId(e.target.value)}
        />
      </div>
      <button onClick={handleSubscribe}>Subscribe</button>
      <button onClick={handleNotify}>Notify</button>
      <button onClick={handleUnsubscribe}>Unsubscribe</button>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default App;