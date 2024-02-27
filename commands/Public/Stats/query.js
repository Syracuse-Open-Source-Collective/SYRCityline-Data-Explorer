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
const reply = require("../../../constants/replies");
const {
  getDatabaseUpdatedTime,
} = require("../../../functions/getDatabaseUpdatedTime");

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
        content: reply["data.search"],
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
          const wantedDate = new Date(year, month);
          const wantedYear = wantedDate.getFullYear();
          const wantedMonth = wantedDate.getMonth();
          const realcurrentMonth = (wantedMonth + 1)
            .toString()

          // Filter records for the current year and month
          const wantedRecords = csvData.filter((record) => {
            const createdAt = record.Created_at_local;
            const year = parseInt(createdAt.match(/\d{2}\/\d{2}\/(\d{4})/)[1]);
            const month = parseInt(createdAt.match(/(\d{2})\/\d{2}\/\d{4}/)[1]);
            console.log(createdAt, year, month, wantedYear, realcurrentMonth);
            return year === wantedYear && month === wantedMonth;
          });

          // Get count of records for the current year
          let count = wantedRecords.length;

          // If no records found, inform user, and exit.
          if (count === 0) {
            interaction.editReply(reply["data.notFound.year"]);
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
              `SyrCityLine Request Stats For ${realcurrentMonth}/${wantedYear}`
            )
            .setAuthor({
              name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(`The request count for your selected month, year.`)
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
                value: `${sortedCategories[0]} (${
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
            embeds: [queryembed],
            content: " ",
            files: [attachment],
          });
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
