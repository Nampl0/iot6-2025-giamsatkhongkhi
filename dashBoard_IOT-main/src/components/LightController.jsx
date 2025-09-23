import axios from "axios";
import React, { useState } from "react";
// import './App.css';

function Light() {
  const [isOn, setIsOn] = useState(false);

  const turnOn = () => {
    setIsOn(true);
    toggleLed("on1");
  };

  const turnOff = () => {
    setIsOn(false);
    toggleLed("off1");
  };

  const toggleLed = async (action) => {
    await axios.post("http://localhost:3000/publisher", {
      topic: "led/control",
      message: action,
    });
  };

  return (
    <div className="App1">
      <img
        src={isOn ? "light_on.png" : "/light_off.png"}
        style={{ width: 64, height: 90 }}
        alt="Light"
      />
      <div>
        <button onClick={turnOn}>On</button>
        <button onClick={turnOff}>Off</button>
      </div>
    </div>
  );
}

export default Light;
