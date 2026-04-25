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
    if (req.body.user == "Student") {
      const student_pass = await student.findOne({ id: req.body.id });
      if (!student_pass)
        return res.status(404).json({ message: "Student not found" });

      const isMatch = await student_pass.comparepassword(req.body.password);
      if (!isMatch) return res.status(401).json({ message: "Wrong password" });

      const token = jwt.sign(
        { user: req.body.user, id: req.body.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
      );
      res.status(200).json({ token });
    } else {
      const admin_data = await admin.findOne({});
      if (!admin_data)
        return res.status(404).json({ message: "Admin not found" });

      if (
        admin_data.teacher_id != req.body.id ||
        admin_data.teacher_password != req.body.password
      )
        return res.status(401).json({ message: "Wrong credentials" });

      const token = jwt.sign(
        { user: "teacher", id: req.body.id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
      );
      res.status(200).json({ token });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
