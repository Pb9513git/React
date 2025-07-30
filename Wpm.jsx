import React, { useEffect, useRef, useState } from 'react';

export default function Wpm() {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(0);
  const [second, setSeconds] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const timer = useRef(null);

  function handleSubmit(e) {
    setText(e.target.value);

    
    if (!timer.current) {
      timer.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
  }

  useEffect(() => {
    const words = text.trim().split(/\s+/).length;
    if (second > 0) {
      setWpm(Math.round((words / second) * 60));
    }
  }, [text, second]);

  const char = text.replace(/\s+/g, '').length;

  function handleShowResult() {
    setShowResult(true);
    clearInterval(timer.current); 
  }

  return (
    <div>
      <textarea value={text} onChange={handleSubmit} placeholder="Start typing..." />
      <br />
      <button onClick={handleShowResult}>Submit</button>

      {showResult && (
        <>
          <p>WPM: {wpm}</p>
          <p>Characters: {char}</p>
          <p>Time: {second} seconds</p>
        </>
      )}
    </div>
  );
}