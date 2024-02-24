/**
 * Module dependencies
 */
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

/**
 * Constants
 */
const { writeToCSV } = require("../functions/writeToCSV");
const { fetchAllRecords } = require("../functions/fetchAllRecords");

// Schedule the task to run every day at 5:00 AM
cron.schedule(
  "0 5 * * *",
  async () => {
    console.log("Running CSV update cron job...");
    try {
      // Fetch data from the API
      const allRecords = await fetchAllRecords();

      // Write fetched data to CSV file
      await writeToCSV(allRecords);

      // Create the updated time
      const currentDate = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      const updatedTimeRow = `Database last updated time: ${formattedDate}\n`;

      fs.writeFileSync(
        "data/database_updated_time.txt",
        updatedTimeRow,
        (err) => {
          if (err) throw err;
        }
      );

      // Log success message
      console.log("CSV file has been successfully updated.");
      console.log("Database updated time file has been successfully created.");
    } catch (error) {
      // Log the error message
      console.error("Failed to update CSV file:", error.message);
    }
  },
  {
    scheduled: true,
    timezone: "America/New_York",
  }
);
