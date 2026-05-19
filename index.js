#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

const projectName = process.argv[2] || "stock-app";

const currentDir = process.cwd();
const targetDir = path.join(currentDir, projectName);

const templateDir = path.join(__dirname, "template");

console.log("📦 Creating frontend project...\n");

try {
  // Copy template
  fs.copySync(templateDir, targetDir);

  console.log("🔧 Installing frontend dependencies...\n");

  // Install frontend deps
  execSync("npm install", {
    cwd: path.join(targetDir, "frontend"),
    stdio: "ignore"
  });

  // Install backend deps silently
  execSync("npm install", {
    cwd: path.join(targetDir, "server"),
    stdio: "ignore"
  });

  console.log("✅ Frontend dependencies installed!");
  console.log("\n🚀 Project ready!");

  console.log(`\ncd ${projectName}`);

} catch (err) {
  console.error("❌ Installation failed.");
}