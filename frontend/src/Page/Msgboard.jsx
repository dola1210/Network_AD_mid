// Msgboard.jsx
import React, { useState, useEffect } from 'react';
import './Msgboard.css'; // 引入样式文件

const Msgboard = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userName, setUser] = useState('');
    const [errormsg, setErr] = useState('');

    
    useEffect(() => {
      fetchData()
      .then(dataj => {
        if(dataj.length===0){
          setUser('');
        }
        else{
          setUser(dataj.name);
        }
      })
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
      fetchData2()
      .then(data => {
        setMessages(data)
      })
        .catch(error => console.error(error));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErr('');
        if (userName === ''){
          alert('請先登入才能留言！');
          return;
        }

        if (message) {
            const newMessage = {
                name: userName, // 使用从props或上下文获取的用户名
                text: message
            };
            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newMessage)
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const messages = await response.json(); // 假设后端返回所有留言的数组
                setMessages(messages); // 使用后端返回的留言数组更新状态
            } catch (error) {
                console.error('Failed to send message:', error);
            }
            // setMessages([...messages, newMessage]);
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
                            <img src={ msg.photo } alt="User Avatar" />
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
            <div style={{ color: 'red' }}>{errormsg}</div>
        </div>
        
    );
};

function fetchData() {
  return fetch('/api/check')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
}

function fetchData2() {
  return fetch('/api/msgs')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
}

export default Msgboard;
