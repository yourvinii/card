import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const email = "admin@example.com";
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");
  } catch (error) {
    console.log(error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
