// Home.jsx
import React, { useState } from 'react';

const GenImg = () => {
  const [inputdes, setinputName] = useState('');
  const [img, setimg] = useState('');

  // 輸入框變化
  const handleNameChange = (event) => {
    setinputName(event.target.value);
  };


  const handleSubmit = () => {
    if (inputdes != "") {
      sendData(inputdes)
        .then(dataString => {
          if(dataString === 'loginfai'){
            alert(`登入失敗`)
          }
          else 
            setimg(dataString)
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h2>Generate an image! (請耐心等候)</h2>
      <br></br>
      
      <input
        type="text"
        value={inputdes}
        onChange={handleNameChange}
        placeholder="Description"
      />
      <br></br>
      <br></br>

      <button onClick={handleSubmit}>Generate</button>
      <br></br>
      <br></br>
      <img src={ img } width="300"/>
    </div>
  );
}


function sendData(data1) {
  const payload = {
    des: data1,
  };
  return fetch('/api/GenImg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      alert('登入失敗');
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();  // 修改这里以获取文本响应
  })
  .catch((error) => {
    alert('登入失敗');
    console.error('Error:', error);
  });
}


export default GenImg;