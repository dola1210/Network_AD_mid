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
      sendData(inputName, inputPwd)
        .then(dataString => {
          if(dataString==='success')
            setMessage(`${inputName} 註冊成功！`);
          else
            setMessage(`註冊失敗！`);
        })
        .catch(error => console.error(error));
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
        type="password"
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
  return fetch('/createuser2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      setMessage('註冊失敗');
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();  // 修改这里以获取文本响应
  })
  .catch((error) => {
    setMessage('註冊失敗');
    console.error('Error:', error);
  });
}


export default CreateUser;