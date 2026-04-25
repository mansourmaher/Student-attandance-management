const mongoose = require("mongoose");
require("dotenv").config();

// eslint-disable-next-line no-undef
// eslint-disable-next-line no-undef
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB);
});
// eslint-disable-next-line no-undef
afterAll(async () => {
  await mongoose.connection.close();
});
// eslint-disable-next-line no-undef
test("MongoDB connection is successful", () => {
  // eslint-disable-next-line no-undef
  expect(mongoose.connection.readyState).toBe(1);
});
