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
const monthLocalizations = require("../../../localization/stats-localizations/month-localization");
const databaselocalizations = require("../../../localization/database-time-localization");

/**
 * Expose subCommand
 */
module.exports = {
  subCommand: "stats.month",

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
          // Get current month
          const currentDate = new Date();
          const realcurrentMonth = (currentDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");

          // Get current year
          const currentYear = currentDate.getFullYear();

          // Filter records for the current month
          const currentMonthRecords = csvData.filter((record) => {
            const createdAt = record.Created_at_local;
            const month = createdAt.match(/\d{2}\/(\d{2})\/\d{4}/)[1];
            const year = createdAt.match(/\d{2}\/\d{2}\/(\d{4})/)[1];
            return (
              month === realcurrentMonth && year === currentYear.toString()
            );
          });

          // Get count of records for the current month
          let count = currentMonthRecords.length;

          // Count category occurrences
          currentMonthRecords.forEach((record) => {
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
          const monthembed = new EmbedBuilder()
            .setTitle(
              monthLocalizations[interaction.locale].embedtitle(
                realcurrentMonth,
                currentYear
              ) ??
                monthLocalizations["en-US"].embedtitle(
                  realcurrentMonth,
                  currentYear
                )
            )
            .setAuthor({
              name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(
              monthLocalizations[interaction.locale].embeddescription ??
                monthLocalizations["en-US"].embeddescription
            )
            .setThumbnail("attachment://logo.png")
            .setColor("Orange")
            .addFields(
              {
                name:
                  monthLocalizations[interaction.locale]
                    .embednumberofrequests ??
                  monthLocalizations["en-US"].embednumberofrequests,
                value: `↳ ${count}`,
                inline: true,
              },
              {
                name:
                  monthLocalizations[interaction.locale].embedmostreported ??
                  monthLocalizations["en-US"].embedmostreported,
                value: `↳ ${sortedCategories[0]} (${
                  categoryCounts[sortedCategories[0]]
                } ${
                  monthLocalizations[interaction.locale].embedrequests ??
                  monthLocalizations["en-US"].embedrequests
                })`,
              },
              {
                name:
                  monthLocalizations[interaction.locale].embedleastreported ??
                  monthLocalizations["en-US"].embedleastreported,
                value: `↳ ${sortedCategories[sortedCategories.length - 1]} (${
                  categoryCounts[sortedCategories[sortedCategories.length - 1]]
                } ${
                  monthLocalizations[interaction.locale].embedrequests ??
                  monthLocalizations["en-US"].embedrequests
                })`,
              },
              {
                name:
                  monthLocalizations[interaction.locale].embedtopthree ??
                  monthLocalizations["en-US"].embedtopthree,
                value: topCategories
                  .map(
                    (category) =>
                      `↳ ${category} (${categoryCounts[category]} ${
                        monthLocalizations[interaction.locale].embedrequests ??
                        monthLocalizations["en-US"].embedrequests
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

          interaction.editReply({
            embeds: [monthembed],
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
