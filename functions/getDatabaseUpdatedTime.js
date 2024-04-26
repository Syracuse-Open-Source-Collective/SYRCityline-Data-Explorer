/**
 * Module dependencies
 */
const fs = require("fs");

// Function to read the updated time from the file
function getDatabaseUpdatedTime() {
  try {
    const fileContent = fs.readFileSync(
      "data/database_updated_time.txt",
      "utf-8"
    );
    const updatedTime = fileContent.trim();
    return updatedTime;
  } catch (error) {
    console.error("Error reading updated time from file:", error);
    return null;
  }
}

module.exports = { getDatabaseUpdatedTime };
