// Msgboard.jsx
import React, { useState, useEffect } from 'react';
import './Msgboard.css'; // 引入样式文件

const Msgboard = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userName, setUser] = useState('');

    useEffect(() => {
      fetchData()
      .then(dataString => {
        setUser(dataString)
      })
        .catch(error => console.error(error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (message) {
            const newMessage = {
                id: messages.length + 1,
                name: userName, // 使用从props或上下文获取的用户名
                text: message
            };
            setMessages([...messages, newMessage]);
            setMessage(''); // 清空输入框
        }
    };

    return (
        <div className="msgboard">
            <h1>Message Board</h1>
            <ul>
                {messages.map(msg => (
                    <li key={msg.id}>
                        <div className="message">
                            <img src={`https://i.imgur.com/Vk33vgj.png`} alt="User Avatar" />
                            <div className="message-info">
                                <strong>{msg.name}</strong>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Write a message..."
                    rows="4"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

function fetchData() {
  return fetch('/api/check')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
}

export default Msgboard;
