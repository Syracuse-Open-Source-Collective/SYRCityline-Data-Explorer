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
const overalllocalizations = require("../../../localization/stats-localizations/overall-localization");
const databaselocalizations = require("../../../localization/database-time-localization");

/**
 * Expose subCommand
 */
module.exports = {
  subCommand: "stats.overall",

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
          // Process data
          csvData.forEach((record) => {
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
          const overallEmbed = new EmbedBuilder()
            .setTitle(
              overalllocalizations[interaction.locale]["embedtitle"] ??
                overalllocalizations["en-US"]["embedtitle"]
            )
            .setAuthor({
              name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(
              overalllocalizations[interaction.locale]["embeddescription"] ??
                overalllocalizations["en-US"]["embeddescription"]
            )
            .setThumbnail("attachment://logo.png")
            .setColor("Orange")
            .addFields(
              {
                name:
                  overalllocalizations[interaction.locale][
                    "embednumberofrequests"
                  ] ?? overalllocalizations["en-US"]["embednumberofrequests"],
                value: `↳ ${csvData.length}`,
                inline: true,
              },
              {
                name:
                  overalllocalizations[interaction.locale][
                    "embedmostreported"
                  ] ?? overalllocalizations["en-US"]["embedmostreported"],
                value: `↳ ${sortedCategories[0]} (${
                  categoryCounts[sortedCategories[0]]
                } ${
                  overalllocalizations[interaction.locale]["embedrequets"] ??
                  overalllocalizations["en-US"]["embedrequets"]
                })`,
              },
              {
                name:
                  overalllocalizations[interaction.locale][
                    "embedleastreported"
                  ] ?? overalllocalizations["en-US"]["embedleastreported"],
                value: `↳ ${sortedCategories[sortedCategories.length - 1]} (${
                  categoryCounts[sortedCategories[sortedCategories.length - 1]]
                } ${
                  overalllocalizations[interaction.locale]["embedrequets"] ??
                  overalllocalizations["en-US"]["embedrequets"]
                })`,
              },
              {
                name:
                  overalllocalizations[interaction.locale]["embedtopthree"] ??
                  overalllocalizations["en-US"]["embedtopthree"],
                value: topCategories
                  .map(
                    (category) =>
                      `↳ ${category} (${categoryCounts[category]} ${
                        overalllocalizations[interaction.locale][
                          "embedrequets"
                        ] ?? overalllocalizations["en-US"]["embedrequets"]
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
            embeds: [overallEmbed],
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
