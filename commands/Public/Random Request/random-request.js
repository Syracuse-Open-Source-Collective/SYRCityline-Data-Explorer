/**
 * Module dependencies
 */
const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
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
const requestlocalizations = require("../../../localization/randomrequest-localizations/request-localization");
const databaselocalizations = require("../../../localization/database-time-localization");

/**
 * Expose subCommand
 */
module.exports = {
  subCommand: "request.random",

  /**
   * Execute function
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      // Defer reply
      await interaction.deferReply();

      // choice
      const choice = interaction.options.getString("category");

      // Inform user about data retrieval
      await interaction.followUp({
        content:
          replyLocalizations[interaction.locale]["data.search"] ??
          replyLocalizations["en-US"]["data.search"],
      });

      // Initialize csvData array
      const csvData = [];

      // Read CSV file and process data
      fs.createReadStream(csvFilePath)
        .pipe(parse())
        .on("data", (row) => {
          csvData.push(row);
        })
        .on("end", async () => {
          // Filter data based on category
          const filteredData = csvData.filter((record) => {
            if (record.Category == "") return false;
            return record.Category === choice;
          });

          // If body is empty, inform user, and exit.
          if (filteredData.length === 0) {
            return interaction.editReply({
              content:
                replyLocalizations[interaction.locale]["data.error"] ??
                replyLocalizations["en-US"]["data.error"],
            });
          }

          // Get random request
          const numberRequests = filteredData.length;
          const randomRequest = Math.floor(Math.random() * numberRequests);
          const requestedData = filteredData[randomRequest];

          // Build attachment
          const attachment = new AttachmentBuilder("assets/logo.png");

          // Build embed
          const createRequestEmbed = new EmbedBuilder()
            .setTitle(
              requestlocalizations[interaction.locale].embedtitle(choice) ??
                requestlocalizations["en-US"].embedtitle(choice)
            )
            .setAuthor({
              name:
                requestlocalizations[interaction.locale].embedauthor(
                  interaction,
                  requestedData
                ) ??
                requestlocalizations["en-US"].embedauthor(
                  interaction,
                  requestedData
                ),
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setDescription(
              requestlocalizations[interaction.locale].embeddescription(
                requestedData
              ) ?? requestlocalizations["en-US"].embeddescription(requestedData)
            )
            .setThumbnail("attachment://logo.png")
            .setURL(requestedData.URL)
            .setColor("Orange")
            .addFields(
              {
                name:
                  requestlocalizations[interaction.locale].embedsummary(
                    requestedData
                  ).name ??
                  requestlocalizations["en-US"].embedsummary(requestedData),
                value:
                  requestlocalizations[interaction.locale].embedsummary(
                    requestedData
                  ).value ??
                  requestlocalizations["en-US"].embedsummary(requestedData)
                    .value,
                inline: true,
              },
              {
                name: "> Address:",
                value: `↳ ${requestedData.Address || "No Address provided"}`,
                inline: true,
              },
              {
                name: "> Source:",
                value: `↳ ${
                  requestedData.Report_Source || "No Source Provided"
                }`,
              },
              {
                name: "> Agency:",
                value: `↳ ${requestedData.Agency_Name || "No Agency assigned"}`,
              },
              {
                name: "> Assignee:",
                value: `↳ ${requestedData.Assignee_name || "No Assignee"}`,
              },
              {
                name: "> Latitude:",
                value: `↳ ${requestedData.Lat || "N/A"}`,
                inline: true,
              },
              {
                name: "> Longitude :",
                value: `↳ ${requestedData.Lng || "N/A"}`,
                inline: true,
              },
              {
                name: "> Acknowledged At:",
                value: `↳ ${requestedData.Acknowledged_at_local || "N/A"}`,
                inline: false,
              },
              {
                name: "> Created At:",
                value: `↳ ${requestedData.Created_at_local}`,
                inline: true,
              },
              {
                name: "> Closed At:",
                value: `↳ ${requestedData.Closed_at_local || "Not closed yet"}`,
                inline: true,
              }
            )
            .setFooter({
              text:
                databaselocalizations[interaction.locale].databaseupdated ??
                databaselocalizations["en-US"].databaseupdated,
            });

          // Build row
          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("new")
              .setStyle(ButtonStyle.Success)
              .setLabel("🔄 See New Request")
          );

          // Send message
          const message = await interaction.editReply({
            content: `Showing you a random request in the category of \`${choice}!\``,
            embeds: [createRequestEmbed],
            files: [attachment],
            components: [row],
          });

          // Create collector
          const userID = interaction.user.id;
          const command = interaction.commandName;

          const collector = message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 15000,
          });

          collector.on("collect", async (interaction) => {
            if (interaction.user.id !== userID) {
              await interaction.reply({
                content: `You cannot use this button as you did not initiate the command. Run \`/${command}\`!`,
                ephemeral: true,
              });
              return;
            }

            if (interaction.customId === "new") {
              const randomRequest = Math.floor(Math.random() * numberRequests);
              const newRequestedData = filteredData[randomRequest];

              const newRequestEmbed = new EmbedBuilder()
                .setTitle(`SyrCityLine ${newRequestedData.Category} Request`)
                .setAuthor({
                  name: `${interaction.user.tag} | Request Followers - ${newRequestedData.Rating}`,
                  iconURL: interaction.user.displayAvatarURL(),
                })
                .setDescription(
                  `Description: ***${
                    newRequestedData.Description || "No Description Provided"
                  }***`
                )
                .setThumbnail("attachment://logo.png")
                .setURL(newRequestedData.URL)
                .setColor("Orange")
                .addFields(
                  {
                    name: "> Summary:",
                    value: `↳ ${
                      newRequestedData.Summary || "No Summary provided"
                    }`,
                    inline: true,
                  },
                  {
                    name: "> Address:",
                    value: `↳ ${
                      newRequestedData.Address || "No Address provided"
                    }`,
                    inline: true,
                  },
                  {
                    name: "> Source:",
                    value: `↳ ${
                      newRequestedData.Report_Source || "No Source Provided"
                    }`,
                  },
                  {
                    name: "> Agency:",
                    value: `↳ ${
                      newRequestedData.Agency_Name || "No Agency assigned"
                    }`,
                  },
                  {
                    name: "> Assignee:",
                    value: `↳ ${
                      newRequestedData.Assignee_name || "No Assignee"
                    }`,
                  },
                  {
                    name: "> Latitude:",
                    value: `↳ ${newRequestedData.Lat || "N/A"}`,
                    inline: true,
                  },
                  {
                    name: "> Longitude :",
                    value: `↳ ${newRequestedData.Lng || "N/A"}`,
                    inline: true,
                  },
                  {
                    name: "> Acknowledged At:",
                    value: `↳ ${
                      newRequestedData.Acknowledged_at_local || "N/A"
                    }`,
                    inline: false,
                  },
                  {
                    name: "> Created At:",
                    value: `↳ ${newRequestedData.Created_at_local}`,
                    inline: true,
                  },
                  {
                    name: "> Closed At:",
                    value: `↳ ${
                      newRequestedData.Closed_at_local || "Not closed yet"
                    }`,
                    inline: true,
                  }
                )
                .setFooter({
                  text:
                    databaselocalizations[interaction.locale].databaseupdated ??
                    databaselocalizations["en-US"].databaseupdated,
                });

              await interaction.update({
                content: `Showing you a random request in the category of \`${newRequestedData.Category}\`!`,
                embeds: [newRequestEmbed],
                files: [attachment],
                components: [row],
              });
            }
          });

          collector.on("end", () => {
            row.components.forEach((component) => {
              component.setDisabled(true);
            });

            message.edit({
              components: [row],
            });
          });
        });
    } catch (error) {
      console.log(error);
      interaction.editReply({
        content:
          replyLocalizations[interaction.locale]["data.error"] ??
          replyLocalizations["en-US"]["data.error"],
      });
    }
  },
};
