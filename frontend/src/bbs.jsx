import React, { useEffect, useState } from 'react';
import './bbs.css';

function Bbs() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    const msghis = JSON.parse(localStorage.getItem('msgs')) || [];
    setMsgs(msghis);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const newMessage = { name, msg };
    const updatedMessages = [...msgs, newMessage];
    setMsgs(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setName('');
    setMsg('');
  };
    
  return (
    <div className="Bbs">
      <h2 align="center">Message Board</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:&emsp;
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br /><br />
        <label>
          Message:   
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
        </label>
        <br /><br />
        <button type="submit">Submit!</button>
      </form>
      <br/>
      <div>
        <h3 align="center">Messages</h3>
        {msgs.map((msgi, index) => (
          <div key={index}>
            <p><strong>{msgi.name}:</strong> {msgi.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Bbs;