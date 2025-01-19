import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const Timer = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Clock className="h-5 w-5 text-blue-500" />
      <span className="text-xl font-semibold text-white">
        Time Left: {formatTime(timeLeft)}
      </span>
    </div>
  );
};
export default Timer;
