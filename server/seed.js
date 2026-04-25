const mongoose = require("mongoose");
const student = require("./model/student");
require("dotenv").config();

const students = [
  {
    name: "Linus Torvalds",
    id: "std_1",
    email: "linus@example.com",
    phone_no: "1234567890",
    password: "linus@123",
    attandance: {},
  },
  {
    name: "Ada Lovelace",
    id: "std_2",
    email: "ada@example.com",
    phone_no: "0987654321",
    password: "ada@123",
    attandance: {},
  },
  {
    name: "Alan Turing",
    id: "std_3",
    email: "turing@example.com",
    phone_no: "1122334455",
    password: "turing@123",
    attandance: {},
  },
];

mongoose
  .connect(process.env.MONGODB)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // Clear existing students
    await student.deleteMany({});
    console.log("🗑️ Cleared existing students");

    // Insert new students (passwords auto-hashed by pre-save hook)
    for (const s of students) {
      await new student(s).save();
      console.log(`✅ Created student: ${s.name} (id: ${s.id})`);
    }

    console.log("🎉 Seed completed!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
