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

  return <div >{data}</div>;
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