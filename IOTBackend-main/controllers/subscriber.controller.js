const mqttService = require("../services/mqtt.service");
const express = require("express");
const router = express.Router();

// Change this to point to your MQTT broker
// const MQTT_HOST_NAME = "mqtt://192.168.0.101:1886";
const MQTT_HOST_NAME = "mqtt://172.20.10.5:1701";
const USERNAME = "iot";
const PASSWORD = "123";

var mqttClient = new mqttService(MQTT_HOST_NAME, USERNAME, PASSWORD);
mqttClient.connect();

router.post("/", async function (req, res) {
  try {
    const topic = req.body.topic;
    console.log(`Request Topic Sub :: ${topic}`);

    // Bắt đầu việc subscribe mà không cần chờ hoàn tất
    mqttClient.subscribe(topic);

    // Trả về ngay sau khi subscribe bắt đầu
    res.status(200).json({ status: 200, message: `Subscribed to topic ${topic}` });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
});

module.exports = router;
