const fs = require("fs");
const { parse } = require("json2csv");
const path = require("path");

const scriptDir = __dirname;
const csvFilePath = path.join(scriptDir, "..", "data", "database.csv");

async function writeToCSV(jsonResponse) {
  try {
    if (
      !jsonResponse ||
      !Array.isArray(jsonResponse) ||
      jsonResponse.length === 0
    ) {
      throw new Error("Invalid JSON response or empty array");
    }

    const fields = jsonResponse.reduce((acc, feature) => {
      Object.keys(feature.attributes).forEach((attr) => {
        if (!acc.includes(attr)) {
          acc.push(attr);
        }
      });
      return acc;
    }, []);

    const csv = parse(
      jsonResponse.map((feature) => feature.attributes),
      { fields }
    );

    fs.writeFileSync(csvFilePath, csv);

    console.log("CSV file has been successfully updated.");
  } catch (error) {
    console.error("Error writing to CSV:", error.message);
  }
}

module.exports = { writeToCSV };
