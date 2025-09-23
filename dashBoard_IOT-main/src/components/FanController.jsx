import React, { useState } from 'react';
import axios from "axios";
import './app.css';

function Fan() {
    const [rotate, setRotate] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const turnOn = () => {
        setIsOn(true);
        toggleLed("on2");
        setRotate(true);
    };

    const turnOff = () => {
        setIsOn(false);
        toggleLed("off2");
        setRotate(false);
    };

    const toggleLed = async (action) => {
        await axios.post("http://localhost:3000/publisher", {
            topic: "led/control",
            message: action,
        });
    };

    return (
        <div className="App">
            <img
                src="/fan1.png"
                style={{ width: 70, height: 70 }}
                alt="Fan"
                className={`fan ${rotate ? 'rotate' : ''}`}
            />
            <div>
                <button onClick={turnOn}>On</button>
                <button onClick={turnOff}>Off</button>
            </div>
        </div>
    );
}

export default Fan;
