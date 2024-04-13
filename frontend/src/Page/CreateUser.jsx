// Home.jsx
import React, { useState } from 'react';

const CreateUser = () => {
  const [inputText, setInputText] = useState('');
  const [message, setMessage] = useState('');

  // 輸入框變化
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    if (inputText != "") {
      sendData(inputText);
      setMessage(`已新增${inputText}`);
      setInputText('');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter User Name"
      />
      <br></br>
      <br></br>
      <button onClick={handleSubmit}>Create User</button>
      {message && <p>{message}</p>} { }
    </div>
  );
}


function sendData(data) {
  fetch('/createuser', {
    method: 'POST', // 或 'PUT'
    headers: {
      'Content-Type': 'text/plain',
    },
    body: data,
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

export default CreateUser;