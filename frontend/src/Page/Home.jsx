// Home.jsx
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    fetchData()
      .then(dataString => {
        if(dataString === '')
          setData('no log in')
        else
          setData(`Welcome , ${dataString}!`)
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div >
      <h1 align="center">ADNS_Mid</h1>
      <br></br>
      <p align="center">R12921A09 胡丞佑</p>
      <br></br>
      <div>
          <img src={`https://i.imgur.com/guRWsKZ.jpeg`} width="300"/>
      </div>
      <br></br>
      
      <p align="center">Hi! 我是丞佑，目前是台大電機資安碩士班的學生。</p>
      <br></br>
      <p align="center">請多指教！</p>
    
    </div>);
}


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

export default Home;