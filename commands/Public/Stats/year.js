/**
 * Module dependencies
 */
const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
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
const {
  getDatabaseUpdatedTime,
} = require("../../../functions/getDatabaseUpdatedTime");
const replyLocalizations = require("../../../localization/replies-localizations");
const yearLocalizations = require("../../../localization/stats/year-localizations");

/**
 * Expose subCommand
 */
module.exports = {
  subCommand: "stats.year",

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

      // Initialize categoryCounts object
      const categoryCounts = {};

      // Initialize csvData array
      const csvData = [];

      // Read CSV file and process data
      fs.createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (data) => csvData.push(data))
        .on("end", () => {
          // Get current year
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();

          // Filter records for the current year
          const currentYearRecords = csvData.filter((record) => {
            const createdAt = record.Created_at_local;
            const year = createdAt.match(/\d{2}\/\d{2}\/(\d{4})/)[1];
            return year === currentYear.toString();
          });

          // Get count of records for the current year
          let count = currentYearRecords.length;

          // Count category occurrences
          currentYearRecords.forEach((record) => {
            const category = record.Category;
            if (categoryCounts[category]) {
              categoryCounts[category]++;
            } else {
              categoryCounts[category] = 1;
            }
          });

          // Sort categories by count
          const sortedCategories = Object.keys(categoryCounts).sort(
            (a, b) => categoryCounts[b] - categoryCounts[a]
          );

          // Get top three categories
          const topCategories = sortedCategories.slice(0, 3);

          // Build attachment
          const attachment = new AttachmentBuilder("assets/logo.png");

          // Build embed
          const yearEmbed = new EmbedBuilder()
            .setTitle(
              yearLocalizations[interaction.locale][
                "Yearly Request Statistics"
              ] ?? `SyrCityLine Request Stats For ${currentDate.getFullYear()}`
            )
            .setAuthor({
              name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(
              yearLocalizations[interaction.locale][
                "The current request numbers for the current year."
              ] ??
                yearLocalizations["en-US"][
                  "The current request numbers for the current year."
                ]
            )
            .setThumbnail("attachment://logo.png")
            .setColor("Orange")
            .addFields(
              {
                name: "> Number of Requests:",
                value: `↳ ${count}`,
                inline: true,
              },
              {
                name: "> Most Reported Category:",
                value: `↳ ${sortedCategories[0]} (${
                  categoryCounts[sortedCategories[0]]
                } requests)`,
              },
              {
                name: "> Least Reported Category:",
                value: `↳ ${sortedCategories[sortedCategories.length - 1]} (${
                  categoryCounts[sortedCategories[sortedCategories.length - 1]]
                } requests)`,
              },
              {
                name: "> Top Three Categories:",
                value: topCategories
                  .map(
                    (category) =>
                      `↳ ${category} (${categoryCounts[category]} requests)`
                  )
                  .join("\n"),
              }
            )
            .setFooter({ text: `${getDatabaseUpdatedTime()}` });

          // Edit reply
          interaction.editReply({
            embeds: [yearEmbed],
            content: " ",
            files: [attachment],
          });
        });
    } catch (error) {
      console.error(error);
      // Handle error
      interaction.editReply({
        content:
          replyLocalizations[interaction.locale]["data.error"] ??
          replyLocalizations["en-US"]["data.error"],
      });
    }
  },
};
