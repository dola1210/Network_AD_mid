import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cnt = parseInt(localStorage.getItem('visitCount')) || 0;
    const newcnt = cnt + 1;
    localStorage.setItem('visitCount', newcnt);
    setCount(newcnt);
  }, []);
    
  return (
    <div className="App">
      <p align="center">訪問人數： {count} </p>
    </div>
  );
}
export default App;