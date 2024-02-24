/**
 * Module dependencies
 */
const { ChatInputCommandInteraction } = require("discord.js");
const { mutipleRequests } = require("../../../functions/mutipleRequests");
const parse = require("csv-parser");
const fs = require("fs");
const path = require("path");

/**
 * Constants
 */
const csvFilePath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "data",
  "database.csv"
);
const reply = require("../../../constants/replies");
const { createAddressRegex } = require("../../../functions/createAddressRegex");

/**
 * Expose subCommand
 */
module.exports = {
  subCommand: "search.address",

  /**
   * Execute function
   *
   * @param {ChatInputCommandInteraction} interaction - The command interaction
   */
  async execute(interaction) {
    try {
      // Defer reply
      await interaction.deferReply();

      // Get address
      const address = interaction.options.getString("address");

      // Inform user about data retrieval
      await interaction.followUp({
        content: reply["data.search"],
      });

      // Initialize csvData array
      const csvData = [];

      // Read CSV file and process data
      fs.createReadStream(csvFilePath)
        .pipe(parse())
        .on("data", (row) => {
          csvData.push(row);
        })
        .on("end", async () => {
          // Filter data based on address
          const filteredData = csvData.filter((record) => {
            if (record.Address == "") return false;
            const addressRegex = createAddressRegex(address);
            return addressRegex.test(record.Address);
          });

          // Check if data was found
          if (filteredData.length === 0) {
            return interaction.editReply({
              content: reply["data.notFound.address"],
            });
          }

          const requests = filteredData.map((record) => {
            return {
              id: record.Id,
              category: record.Category,
              followers: record.Rating,
              description: record.Description,
              url: record.URL,
              summary: record.Summary,
              address: record.Address,
              source: record.Report_Source,
              agency: record.Agency_Name,
              assignee: record.Assignee_name,
              latitude: record.Lat,
              longitude: record.Lng,
              acknowledgedat: record.Acknowledged_at_local,
              createdat: record.Created_at_local,
              closedat: record.Closed_at_local,
            };
          });

          // Send data to mutipleRequests function
          await mutipleRequests(interaction, requests);
        });
    } catch (error) {
      console.error(error);
      // Handle error
      interaction.editReply({
        content: reply["data.error"],
      });
    }
  },
};
