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
const querylocalizations = require("../../../localization/stats-localizations/query-localization");
const databaselocalizations = require("../../../localization/database-time-localization");

/**
 * Expose subCommand
 */
module.exports = {
  subCommand: "stats.query",

  /**
   * Execute function
   *
   * @param {ChatInputCommandInteraction} interaction - The command interaction
   */
  async execute(interaction) {
    try {
      // Defer reply
      await interaction.deferReply();

      // Get month and year
      const month = interaction.options.getString("month");
      const year = interaction.options.getString("year");

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
          // Get wanted date
          const wantedDate = new Date(year, month, 0);
          const wantedYear = wantedDate.getFullYear();
          const wantedMonth = wantedDate.getMonth();

          // Filter records for the current year and month
          const wantedRecords = csvData.filter((record) => {
            const createdAt = record.Created_at_local;
            const year = parseInt(createdAt.match(/\d{2}\/\d{2}\/(\d{4})/)[1]);
            const month = parseInt(createdAt.match(/(\d{2})\/\d{2}\/\d{4}/)[1]);

            return year === wantedYear && month === wantedMonth;
          });

          // Get count of records for the current year
          let count = wantedRecords.length;

          // If no records found, inform user, and exit.
          if (count === 0) {
            interaction.editReply(
              replyLocalizations[interaction.locale]["data.notFound.year"] ??
                replyLocalizations["en-US"]["data.notFound.year"]
            );
            return;
          }

          // Count category occurrences
          wantedRecords.forEach((record) => {
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
          const queryembed = new EmbedBuilder()
            .setTitle(
              querylocalizations[interaction.locale]["embedtitle"](
                wantedDate.getMonth() + 1,
                wantedYear
              ) ??
                querylocalizations["en-US"]["embedtitle"](
                  wantedDate.getMonth() + 1,
                  wantedYear
                )
            )
            .setAuthor({
              name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(
              querylocalizations[interaction.locale]["embeddescription"] ??
                querylocalizations["en-US"]["embeddescription"]
            )
            .setThumbnail("attachment://logo.png")
            .setColor("Orange")
            .addFields(
              {
                name:
                  querylocalizations[interaction.locale][
                    "embednumberofrequests"
                  ] ?? querylocalizations["en-US"]["embednumberofrequests"],
                value: `↳ ${count}`,
                inline: true,
              },
              {
                name:
                  querylocalizations[interaction.locale]["embedmostreported"] ??
                  querylocalizations["en-US"]["embedmostreported"],
                value: `${sortedCategories[0]} (${
                  categoryCounts[sortedCategories[0]]
                } ${
                  querylocalizations[interaction.locale]["embedrequests"] ??
                  querylocalizations["en-US"]["embedrequests"]
                })`,
              },
              {
                name:
                  querylocalizations[interaction.locale][
                    "embedleastreported"
                  ] ?? querylocalizations["en-US"]["embedleastreported"],
                value: `↳ ${sortedCategories[sortedCategories.length - 1]} (${
                  categoryCounts[sortedCategories[sortedCategories.length - 1]]
                } ${
                  querylocalizations[interaction.locale]["embedrequests"] ??
                  querylocalizations["en-US"]["embedrequests"]
                })`,
              },
              {
                name:
                  querylocalizations[interaction.locale]["embedtopreported"] ??
                  querylocalizations["en-US"]["embedtopreported"],
                value: topCategories
                  .map(
                    (category) =>
                      `↳ ${category} (${categoryCounts[category]} ${
                        querylocalizations[interaction.locale][
                          "embedrequests"
                        ] ?? querylocalizations["en-US"]["embedrequests"]
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
            embeds: [queryembed],
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
