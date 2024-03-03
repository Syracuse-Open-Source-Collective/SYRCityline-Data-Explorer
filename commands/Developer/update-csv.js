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
const replyLocalizations = require("../../localization/replies-localizations");

/**
 * Expose command
 */
module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("update-csv")
    .setNameLocalizations({
      "es-ES": "actualizar-csv",
      "zh-CN": "更新csv",
      fr: "mettre-à-jour-csv",
      uk: "оновити-csv",
      it: "aggiorna-csv",
      de: "aktualisieren-csv",
    })
    .setDescription("Updates the bot's CSV file.")
    .setDescriptionLocalizations({
      "es-ES": "Actualiza el archivo CSV del bot.",
      "zh-CN": "更新机器人的CSV文件。",
      fr: "Met à jour le fichier CSV du bot.",
      uk: "Оновлює файл CSV бота.",
      it: "Aggiorna il file CSV del bot.",
      de: "Aktualisiert die CSV-Datei des Bots.",
    }),

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
        content:
          replyLocalizations[interaction.locale]["data.search"] ??
          replyLocalizations["en-US"]["data.search"],
      });

      // Fetch all records
      const allRecords = await fetchAllRecords();

      // Check if there are records
      if (!allRecords || allRecords.length === 0) {
        return interaction.editReply(
          replyLocalizations[interaction.locale]["data.notfound"] ??
            replyLocalizations["en-US"]["data.notfound"]
        );
      }

      // Write to CSV
      await writeToCSV(allRecords);

      // Inform user about successful update
      await interaction.editReply(
        replyLocalizations[interaction.locale]["data.updated"] ??
          replyLocalizations["en-US"]["data.updated"]
      );

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
        replyLocalizations[interaction.locale]["data.failedupdate"] ??
          replyLocalizations["en-US"]["data.failedupdate"]
      );
    }
  },
};
