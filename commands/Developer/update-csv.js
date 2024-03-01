/**
 * Module dependencies
 */
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const fs = require("fs");

/**
 * Constants
 */
const { writeToCSV } = require("../../functions/writeToCSV");
const { fetchAllRecords } = require("../../functions/fetchAllRecords");
const reply = require("../../constants/replies");

/**
 * Expose command
 */
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("update-csv")
    .setDescription("Updates the bot's CSV file."),

  /**
   * Execute function
   *
   * @param {ChatInputCommandInteraction} interaction - The command interaction
   */
  async execute(interaction) {
    try {
      // Defer reply
      await interaction.deferReply();

      // Inform user about data retrieval
      await interaction.followUp({
        content: reply["data.search"],
      });

      // Fetch all records
      const allRecords = await fetchAllRecords();

      // Check if there are records
      if (!allRecords || allRecords.length === 0) {
        throw interaction.editReply(
          "Failed to fetch data from API or no data available."
        );
      }

      // Write to CSV
      await writeToCSV(allRecords);

      // Inform user about successful update
      await interaction.editReply("CSV file has been successfully updated.");

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
      const updatedTimeRow = `${formattedDate}\n`;

      // Write to database_updated_time.txt
      fs.writeFileSync(
        "data/database_updated_time.txt",
        updatedTimeRow,
        (err) => {
          if (err) throw err;
        }
      );
    } catch (error) {
      console.error("Error updating CSV:", error.message);
      await interaction.editReply(
        "Failed to update CSV file. Please try again later."
      );
    }
  },
};
