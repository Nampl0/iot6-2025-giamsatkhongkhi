const express = require("express"),
  router = express.Router();

const service = require("../services/history.service");

router.post("/", async (req, res) => {
  const data = await service.getAllHistory(req.body);
  res.send(data);
});

router.post("/create", async (req, res) => {
  await service.AddAHistory(req.body);
  res.status(201).send("Created successfully.");
});

module.exports = router;
