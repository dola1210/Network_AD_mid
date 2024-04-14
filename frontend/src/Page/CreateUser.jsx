// Home.jsx
import React, { useState } from 'react';

const CreateUser = () => {
  const [inputName, setinputName] = useState('');
  const [inputPwd, setinputPwd] = useState('');
  const [message, setMessage] = useState('');

  // 輸入框變化
  const handleNameChange = (event) => {
    setinputName(event.target.value);
  };
  const handlePwdChange = (event) => {
    setinputPwd(event.target.value);
  };

  const handleSubmit = () => {
    if (inputName != "" & inputPwd != "") {
      sendData(inputName, inputPwd);
      setMessage(`${inputName} 註冊成功！`);
      setinputName('');
      setinputPwd('');
    }
  };

  return (
    <div>
      <h2>Sign up your own account!</h2>
      <br></br>
      
      <input
        type="text"
        value={inputName}
        onChange={handleNameChange}
        placeholder="Username"
      />
      <br></br>
      <br></br>

      <input
        type="text"
        value={inputPwd}
        onChange={handlePwdChange}
        placeholder="Password"
      />
      <br></br>
      <br></br>
      
      <button onClick={handleSubmit}>Sign Up</button>
      {message && <p>{message}</p>} { }
    </div>
  );
}


function sendData(data1, data2) {
  const payload = {
    name: data1,
    pwd: data2
  };
  fetch('/createuser', {
    method: 'POST', // 或 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
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