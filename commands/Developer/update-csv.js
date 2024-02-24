const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const { writeToCSV } = require("../../functions/writeToCSV");
const { fetchAllRecords } = require("../../functions/fetchAllRecords");
const fs = require("fs");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("update-csv")
    .setDescription("Updates the bot's CSV file."),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const allRecords = await fetchAllRecords();

      if (!allRecords || allRecords.length === 0) {
        throw interaction.editReply(
          "Failed to fetch data from API or no data available."
        );
      }

      await writeToCSV(allRecords);

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
      const updatedTimeRow = `Database last updated time: ${formattedDate}\n`;

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
