const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./db");
const User = require("../models/user.model");
const Workflow = require("../models/workflow.model");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();
    console.log("Database connected for seeding...");

    // 2. Find or Create Default Admin
    let admin = await User.findOne({ email: "admin@stackorbit.io" });
    if (!admin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      admin = await User.create({
        name: "Administrator",
        email: "admin@stackorbit.io",
        password: hashedPassword,
        role: "admin",
        bio: "StackOrbit Core Administrator Profile",
        avatar: ""
      });
      console.log("Admin account created.");
    }

    // 3. Read dataset.json from the root
    const datasetPath = path.join(__dirname, "../../../dataset.json");
    if (!fs.existsSync(datasetPath)) {
      throw new Error(`dataset.json not found at ${datasetPath}`);
    }

    const rawData = fs.readFileSync(datasetPath, "utf-8");
    const jsonDataset = JSON.parse(rawData);
    console.log(`Loaded ${jsonDataset.length} items from dataset.json`);

    // 4. Clean existing workflows
    await Workflow.deleteMany({});
    console.log("Cleared existing workflows from database.");

    // 5. Map and seed the first 100 workflows
    const limit = Math.min(jsonDataset.length, 100);
    const workflowsToInsert = [];

    const allowedCategories = ["github-actions", "gitlab-ci", "jenkins", "circleci", "testing"];

    for (let i = 0; i < limit; i++) {
      const item = jsonDataset[i];
      
      // Ensure category matches allowed ones (fallback to 'testing' if not matching)
      let category = item.topic;
      if (!allowedCategories.includes(category)) {
        category = "testing";
      }

      workflowsToInsert.push({
        title: item.instruction || `Workflow Template ${i + 1}`,
        description: item.output ? item.output.substring(0, 180) + "..." : "No description provided.",
        yamlContent: item.output || "",
        category: category,
        tags: [item.difficulty || "intermediate", item.topic || "ci-cd"],
        createdBy: admin._id,
        isArchived: false,
        views: Math.floor(Math.random() * 500) + 50,
        likes: Math.floor(Math.random() * 80) + 10
      });
    }

    await Workflow.insertMany(workflowsToInsert);
    console.log(`Successfully seeded ${workflowsToInsert.length} real-world workflows into MongoDB!`);
    process.exit(0);

  } catch (error) {
    console.error("Error during dataset seeding:", error.message);
    process.exit(1);
  }
};

seedDatabase();