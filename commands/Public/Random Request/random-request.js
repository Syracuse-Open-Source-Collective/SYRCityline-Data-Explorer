const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");
const superagent = require("superagent");
const {
  randomRequestSelectMenu,
} = require("../../../functions/randomRequestSelectMenu");

module.exports = {
  subCommand: "request.random",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const choice = interaction.options.getString("category");

      await interaction.followUp({
        content:
          "I am currently retrieving the necessary data from the API. Please bear with me for a moment!",
      });

      let { body } = await superagent.get(
        `https://services6.arcgis.com/bdPqSfflsdgFRVVM/arcgis/rest/services/SeeClickFix_Requests_2021_Present_AutoUpdate_Test/FeatureServer/0/query?where=Category%20%3D%20%27${choice}%27&outFields=Id,Summary,Rating,Address,Description,Agency_Name,Request_type,URL,Lat,Lng,Created_at_local,Closed_at_local,Assignee_name,Category,Report_Source,Acknowledged_at_local,Minutes_to_acknowledged,Minutes_to_closed&outSR=4326&f=json`
      );

      if (body.error === true) {
        interaction.editReply({
          content:
            "We had an error fetching the data from the API! Please, try again at a later time!",
        });
      }

      if (body.features.length === 0) {
        interaction.editReply(
          "I am sorry but I could not find any requests with that Category! Try a different Category!"
        );
      }

      const numberRequests = body.features.length;
      const randomRequest = Math.floor(Math.random() * numberRequests);

      const attachment = new AttachmentBuilder("assets/logo.png");

      const selection = await randomRequestSelectMenu(interaction, choice);

      const emojis = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("new")
          .setStyle(ButtonStyle.Success)
          .setLabel("🔄 See New Request")
      );

      const createRequestEmbed = new EmbedBuilder()
        .setTitle(
          `SyrCityLine ${body.features[randomRequest].attributes.Category} Request`
        )
        .setAuthor({
          name: `${interaction.member.user.tag} | Request Followers - ${body.features[randomRequest].attributes.Rating}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        })
        .setDescription(
          `Description: ***${
            body.features[randomRequest].attributes.Description ||
            "No Description Provided"
          }***`
        )
        .setThumbnail("attachment://logo.png")
        .setURL(body.features[randomRequest].attributes.URL)
        .setColor("Orange")
        .addFields(
          {
            name: "> Summary:",
            value: `${
              body.features[randomRequest].attributes.Summary ||
              "No Summary provided"
            }`,
            inline: true,
          },
          {
            name: "> Address:",
            value: `${
              body.features[randomRequest].attributes.Address ||
              "No Address provided"
            }`,
            inline: true,
          },
          {
            name: "> Source:",
            value: `${
              body.features[randomRequest].attributes.Report_Source ||
              "No Source Provided"
            }`,
          },
          {
            name: "> Agency:",
            value: `${
              body.features[randomRequest].attributes.Agency_Name ||
              "No Agency assigned"
            }`,
          },
          {
            name: "> Assignee:",
            value: `${
              body.features[randomRequest].attributes.Assignee_name ||
              "No Assignee"
            }`,
          },
          {
            name: "> Latitude:",
            value: `${body.features[randomRequest].attributes.Lat || "N/A"}`,
            inline: true,
          },
          {
            name: "> Longitude :",
            value: `${body.features[randomRequest].attributes.Lng || "N/A"}`,
            inline: true,
          },
          {
            name: "> Acknowledged At:",
            value: `${
              body.features[randomRequest].attributes.Acknowledged_at_local ||
              "N/A"
            }`,
            inline: false,
          },
          {
            name: "> Created At:",
            value: `${body.features[randomRequest].attributes.Created_at_local}`,
            inline: true,
          },
          {
            name: "> Closed At:",
            value: `${
              body.features[randomRequest].attributes.Closed_at_local ||
              "Not closed yet"
            }`,
            inline: true,
          }
        )
        .setFooter({
          text: `Request ID - ${body.features[randomRequest].attributes.Id} | I would like to clarify that the Syracuse Data Challenge logo is the rightful property of its owner and is not affiliated with me or my bot.`,
        });

      const message = await interaction.editReply({
        content: `Showing you a random request in the category of \`${choice}!\``,
        embeds: [createRequestEmbed],
        files: [attachment],
        components: [selection, emojis],
      });

      const userID = interaction.user.id;
      const command = interaction.commandName;

      const menu = message.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 1500,
      });

      menu.on("collect", async (interaction) => {
        if (!interaction.user.id === message.author.id) {
          await interaction.reply({
            content: `You cannot use this button as you did not initiate the command. Run \`/${command}\`!`,
            ephemeral: true,
          });
          return;
        }
        if (interaction.customId === "Pavement Markings") {
          interaction.update({ content: "test" });
        }
      });

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

          const newRequestEmbed = new EmbedBuilder()
            .setTitle(
              `SyrCityLine ${body.features[randomRequest].attributes.Category} Request`
            )
            .setAuthor({
              name: `${interaction.member.user.tag} | Request Followers - ${body.features[randomRequest].attributes.Rating}`,
              iconURL: `${interaction.user.displayAvatarURL()}`,
            })
            .setDescription(
              `Description: ***${
                body.features[randomRequest].attributes.Description ||
                "No Description Provided"
              }***`
            )
            .setThumbnail("attachment://logo.png")
            .setURL(body.features[randomRequest].attributes.URL)
            .setColor("Orange")
            .addFields(
              {
                name: "> Summary:",
                value: `${
                  body.features[randomRequest].attributes.Summary ||
                  "No Summary provided"
                }`,
                inline: true,
              },
              {
                name: "> Address:",
                value: `${
                  body.features[randomRequest].attributes.Address ||
                  "No Address provided"
                }`,
                inline: true,
              },
              {
                name: "> Source:",
                value: `${
                  body.features[randomRequest].attributes.Report_Source ||
                  "No Source Provided"
                }`,
              },
              {
                name: "> Agency:",
                value: `${
                  body.features[randomRequest].attributes.Agency_Name ||
                  "No Agency assigned"
                }`,
              },
              {
                name: "> Assignee:",
                value: `${
                  body.features[randomRequest].attributes.Assignee_name ||
                  "No Assignee"
                }`,
              },
              {
                name: "> Latitude:",
                value: `${
                  body.features[randomRequest].attributes.Lat || "N/A"
                }`,
                inline: true,
              },
              {
                name: "> Longitude :",
                value: `${
                  body.features[randomRequest].attributes.Lng || "N/A"
                }`,
                inline: true,
              },
              {
                name: "> Acknowledged At:",
                value: `${
                  body.features[randomRequest].attributes
                    .Acknowledged_at_local || "N/A"
                }`,
                inline: false,
              },
              {
                name: "> Created At:",
                value: `${body.features[randomRequest].attributes.Created_at_local}`,
                inline: true,
              },
              {
                name: "> Closed At:",
                value: `${
                  body.features[randomRequest].attributes.Closed_at_local ||
                  "Not closed yet"
                }`,
                inline: true,
              }
            )
            .setFooter({
              text: `Request ID - ${body.features[randomRequest].attributes.Id} | I would like to clarify that the Syracuse Data Challenge logo is the rightful property of its owner and is not affiliated with me or my bot.`,
            });

          await interaction.update({
            content: `Showing you a random request in the category of \`${body.features[randomRequest].attributes.Category}\`!`,
            embeds: [newRequestEmbed],
            files: [attachment],
            components: [selection, emojis],
          });
        }

        collector.on("end", () => {
          emojis.components.forEach((component) => {
            component.setDisabled(true);
          });
          selection.components.forEach((component) => {
            component.setDisabled(true);
          });

          message.edit({
            components: [selection, emojis],
          });
        });
      });
    } catch (error) {
      console.error(error);
      interaction.editReply({
        content:
          "We had an error fetching the data from the API! Please, try again at a later time!",
      });
    }
  },
};
