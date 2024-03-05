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
const QuickChart = require("quickchart-js");

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
const monthMap = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

/**
 * Expose subCommand
 */
module.exports = {
  subCommand: "chart.summary",

  /**
   * Execute function
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      // Defer reply
      await interaction.deferReply();

      // Choice
      const category = interaction.options.getString("category");
      const year = interaction.options.getString("year");
      const type = interaction.options.getString("type") || "bar"; // default is bar chart

      // Inform user about data retrieval
      await interaction.followUp({
        content: reply["data.search"],
      });

      // Initialize csvData array
      const csvData = [];

      // Initialize month counts object
      const monthCounts = {};

      // Read CSV file and process data
      fs.createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (data) => csvData.push(data))
        .on("end", () => {
          // Filter records for the requested year
          const wantedRecords = csvData.filter((record) => {
            const createdAt = record.Created_at_local;
            const recordYear = parseInt(
              createdAt.match(/\d{2}\/\d{2}\/(\d{4})/)[1]
            );
            return (
              recordYear === parseInt(year) && record.Category === category
            );
          });

          // Get count of records for the current year & category
          let count = wantedRecords.length;

          // If no records found, inform user, and exit.
          if (count === 0) {
            interaction.editReply(reply["data.notFound.chart-year-category"]);
            return;
          }

          // Count the records
          wantedRecords.forEach((record) => {
            const createdAt = record.Created_at_local;
            const month = createdAt.match(/(\d{2})\/\d{2}\/\d{4}/)[1];
            const monthName = monthMap[month];
            if (monthName) {
              if (monthCounts[monthName]) {
                monthCounts[monthName] += 1;
              } else {
                monthCounts[monthName] = 1;
              }
            }
          });

          // Create chart
          const chart = new QuickChart();
          chart.setConfig({
            type: `${type}`,
            data: {
              labels: Object.keys(monthCounts),
              datasets: [
                {
                  label: "Requests",
                  data: Object.values(monthCounts),
                  fill: false,
                  spanGaps: true,
                  // backgroundColor: "black",
                  // borderColor: "orange",
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });

          // Build attachment
          const attachment = new AttachmentBuilder("assets/logo.png");

          // Build embed
          const chartEmbed = new EmbedBuilder()
            .setTitle(`SyrCityLine Request Stats For ${category} | ${year}`)
            .setAuthor({
              name: `${interaction.user.tag}`,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(`The chart for your selected category and year.`)
            .setThumbnail("attachment://logo.png")
            .setColor("Orange")
            .setImage(chart.getUrl())
            .setFooter({ text: `${getDatabaseUpdatedTime()}` });

          // Edit reply
          interaction.editReply({
            embeds: [chartEmbed],
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
