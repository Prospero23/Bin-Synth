import { useState, useEffect } from "react";

const Timer = ({ initialTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [timeRemaining]);

  return (
    <div className="absolute top-28 right-28 pointer-events-none text-red-500 font-bold text-2xl text-center">
      {timeRemaining > 0 ? (
        <h2>{timeRemaining}</h2>
      ) : (
        <h2>Done</h2>
      )}
    </div>
  );
};

export default Timer;