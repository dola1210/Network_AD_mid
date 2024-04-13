// Home.jsx
import React, { useState, useEffect } from 'react';

const Users = () => {
  const [data, setData] = useState('');
  useEffect(() => {
    fetchData()
      .then(dataString => setData(dataString))
      .catch(error => console.error(error));
  }, []);

  return <div >Current User: {data}</div>;
}


function fetchData() {
  return fetch('/api/users')
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




export default Users;