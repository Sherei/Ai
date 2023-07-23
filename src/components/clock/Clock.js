import React, { useState, useEffect } from "react";
import "./clock.css"


const Clock  = () => {
    const [time, setTime] = useState(new Date());
  
    useEffect(() => {
      // Update the clock every second
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const getRotationStyle = (handType) => {
      const deg = calculateDegrees(handType);
      return { transform: `rotate(${deg}deg)` };
    };
  
    const calculateDegrees = (handType) => {
      const value = handType === "hour" ? time.getHours() % 12 : handType === "minute" ? time.getMinutes() : time.getSeconds();
      const max = handType === "hour" ? 12 : 60;
      const degree = (360 / max) * value;
      return degree;
    };
  
    const renderClockNumbers = () => {
      const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
      const rotationAngle = 360 / 12;
  
      return numbers.map((number) => {
        const angle = rotationAngle * (number - 3);
        const style = { transform: `rotate(${angle}deg)` };
        return (
          <div key={number} className="clock-number" style={style}>
            {number}
          </div>
        );
      });
    };
  
    return (
      <div className="analog-clock">
        <div className="clock-face">
          {renderClockNumbers()}
          <div className="hour-hand" style={getRotationStyle("hour")}></div>
          <div className="minute-hand" style={getRotationStyle("minute")}></div>
          <div className="second-hand" style={getRotationStyle("second")}></div>
        </div>
      </div>
    );
  };

export default Clock