// Home.jsx
import React, { useState, useEffect } from 'react';

const Users = () => {
  const [data, setData] = useState('');
  const [photo, setPhoto] = useState('');
  const [file, setFile] = useState(null);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);  // 更新文件状态
  };
  const handleUpload = async () => {
    if (!file) {
        alert('Please select a file first!');
        return;
    }
    if (data === '') {
      alert('Please log in first!');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);  // 'image'是后端将要读取的key
    formData.append('name', data);
    try {
        const response = await fetch('/api/upload', {  // '/upload' 是后端的接口URL
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            console.log('Image uploaded successfully');
            alert('上傳成功!');
        } else {
            console.error('Upload failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  useEffect(() => {
    fetchData()
    .then(dataj => {
      if(dataj.length===0){
        setData('');
        setPhoto('');
      }
      else{
        setData(dataj.name);
        setPhoto(dataj.photo);
      }
    })
      .catch(error => console.error(error));
  }, []);

  return (
    <div >
      Current User: {data}
      <br></br>
      <br></br>
      <img src={ photo } width="300"/>
      <br></br>
      <br></br>
      更換大頭貼(上傳需10秒左右)： 
      <input type="file" onChange={handleFileChange} />
      <br></br>
      <br></br>
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}

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


export default Users;