import './App.css';
import React,{useState,useEffect} from 'react';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if(count<0) setCount(0);
  });
  return(
    <div className = 'counter'>
      <h1>Счётчик</h1>
      <h2>{count}</h2>
      <div className = 'control-count'>
        <button className='button less' onClick={() => setCount(count - 1)}>уменьшить</button>      
        <button className = 'button more' onClick = {() => setCount(count + 1)}>увеличить</button>
      </div>

    </div>
  )
}

export default App;
