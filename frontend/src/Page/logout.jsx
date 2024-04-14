// Home.jsx
import React, { useState, useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    fetchData()
      .catch(error => console.error(error));
  }, []);

  return <div >您已成功登出</div>;
}

function fetchData() {
  return fetch('/logout')
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
}

export default Logout;