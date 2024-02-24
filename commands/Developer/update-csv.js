const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");
const { writeToCSV } = require("../../functions/writeToCSV");
const { fetchAllRecords } = require("../../functions/fetchAllReconds");

module.exports = {
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
    } catch (error) {
      console.error("Error updating CSV:", error.message);
      await interaction.editReply(
        "Failed to update CSV file. Please try again later."
      );
    }
  },
};
