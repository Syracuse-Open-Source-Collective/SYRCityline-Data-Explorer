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
  subCommand: "search.id",

  /**
   * Execute function
   *
   * @param {ChatInputCommandInteraction} interaction - The command interaction
   */
  async execute(interaction) {
    try {
      // Defer reply
      await interaction.deferReply();

      // Get ID
      const id = interaction.options.getString("id");

      // Regex to remove commas from ID, and non numeric characters
      const fixed_id = id.replace(/[^0-9]/g, "");

      // Inform user about data retrieval
      await interaction.followUp({
        content: reply["data.search"],
      });

      // Initialize csvData array
      const csvData = [];

      // Read CSV file and process data
      fs.createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row) => {
          csvData.push(row);
        })
        .on("end", () => {
          const requestedData = csvData.filter((record) => {
            return record.Id === fixed_id;
          });

          // If body is empty, inform user, and exit.
          if (requestedData.length === 0) {
            return interaction.editReply(reply["data.notFound.id"]);
          }

          // Build attachment
          const attachment = new AttachmentBuilder("assets/logo.png");

          // Build embed
          const createSearchEmbed = new EmbedBuilder()
            .setTitle(
              `SyrCityLine ${requestedData[0].Category} Request | ID: ${requestedData[0].Id}`
            )
            .setAuthor({
              name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(
              `Description: ***${
                requestedData[0].Description || "No Description Provided"
              }***`
            )
            .setThumbnail("attachment://logo.png")
            .setURL(requestedData[0].URL)
            .setColor("Orange")
            .addFields(
              {
                name: "> Summary:",
                value: `↳ ${requestedData[0].Summary || "No Summary provided"}`,
                inline: true,
              },
              {
                name: "> Address:",
                value: `↳ ${requestedData[0].Address || "No Address provided"}`,
                inline: true,
              },
              {
                name: "> Source:",
                value: `↳ ${
                  requestedData[0].Report_Source || "No Source Provided"
                }`,
              },
              {
                name: "> Agency:",
                value: `↳ ${
                  requestedData[0].Agency_Name || "No Agency assigned"
                }`,
              },
              {
                name: "> Assignee:",
                value: `↳ ${requestedData[0].Assignee_name || "No Assignee"}`,
              },
              {
                name: "> Latitude:",
                value: `↳ ${requestedData[0].Lat || "N/A"}`,
                inline: true,
              },
              {
                name: "> Longitude :",
                value: `↳ ${requestedData[0].Lng || "N/A"}`,
                inline: true,
              },
              {
                name: "> Acknowledged At:",
                value: `↳ ${requestedData[0].Acknowledged_at_local || "N/A"}`,
                inline: false,
              },
              {
                name: "> Created At:",
                value: `↳ ${requestedData[0].Created_at_local}`,
                inline: true,
              },
              {
                name: "> Closed At:",
                value: `↳ ${
                  requestedData[0].Closed_at_local || "Not closed yet"
                }`,
                inline: true,
              }
            )
            .setFooter({ text: `${getDatabaseUpdatedTime()}` });

          // Edit reply
          interaction.editReply({
            content: "",
            embeds: [createSearchEmbed],
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
