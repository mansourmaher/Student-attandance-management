const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();
const admin = require("../model/admin");
const student = require("../model/student");

const data = admin.find().then(() => {
  console.log("found sucessfully");
});
console.log();

router.get("/", async (req, res) => {
  if (mongoose.connection.readyState == 1) {
    return res.send(true);
  } else {
    await new Promise((resolve) => {
      mongoose.connection.once("connected", resolve);
    });
    console.log("connected dude");
  }

  return res.send(true);
});
router.post("/", async (req, res) => {
  try {
    const student_pass = await student.find({});
    res.status(200).json(student_pass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
