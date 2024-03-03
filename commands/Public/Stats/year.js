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
const replyLocalizations = require("../../../localization/replies-localizations");
const yearLocalizations = require("../../../localization/stats-localizations/year-localization");
const databaselocalizations = require("../../../localization/database-time-localization");

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

          // If no records found, inform user, and exit.
          if (count === 0) {
            interaction.reply(
              replyLocalizations[interaction.locale]["data.notFound.year"] ??
                replyLocalizations["en-US"]["data.notFound.year"]
            );
            return;
          }

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
              yearLocalizations[interaction.locale].embedtitle(currentYear) ??
                yearLocalizations["en-US"].embedtitle(currentYear)
            )
            .setAuthor({
              name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(
              yearLocalizations[interaction.locale].embeddescription ??
                yearLocalizations["en-US"].embeddescription
            )
            .setThumbnail("attachment://logo.png")
            .setColor("Orange")
            .addFields(
              {
                name:
                  yearLocalizations[interaction.locale].embednumberofrequests ??
                  yearLocalizations["en-US"].embednumberofrequests,
                value: `↳ ${count}`,
                inline: true,
              },
              {
                name:
                  yearLocalizations[interaction.locale].embedmostreported ??
                  yearLocalizations["en-US"].embedmostreported,
                value: `↳ ${sortedCategories[0]} (${
                  categoryCounts[sortedCategories[0]]
                } ${
                  yearLocalizations[interaction.locale].embedrequests ??
                  yearLocalizations["en-US"].embedrequests
                })`,
              },
              {
                name:
                  yearLocalizations[interaction.locale].embedleastreported ??
                  yearLocalizations["en-US"].embedleastreported,
                value: `↳ ${sortedCategories[sortedCategories.length - 1]} (${
                  categoryCounts[sortedCategories[sortedCategories.length - 1]]
                } ${
                  yearLocalizations[interaction.locale].embedrequests ??
                  yearLocalizations["en-US"].embedrequests
                })`,
              },
              {
                name:
                  yearLocalizations[interaction.locale].embedtopthree ??
                  yearLocalizations["en-US"].embedtopthree,
                value: topCategories
                  .map(
                    (category) =>
                      `↳ ${category} (${categoryCounts[category]} ${
                        yearLocalizations[interaction.locale].embedrequests ??
                        yearLocalizations["en-US"].embedrequests
                      })`
                  )
                  .join("\n"),
              }
            )
            .setFooter({
              text:
                databaselocalizations[interaction.locale].databaseupdated ??
                databaselocalizations["en-US"].databaseupdated,
            });

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
