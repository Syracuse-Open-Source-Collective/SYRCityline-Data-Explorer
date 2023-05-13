const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const superagent = require("superagent");

module.exports = {
  subCommand: "search.id",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const id = interaction.options.getString("id");

      await interaction.followUp({
        content:
          "I am currently retrieving the necessary data from the API. Please bear with me for a moment!",
      });

      const { body } = await superagent.get(
        `https://services6.arcgis.com/bdPqSfflsdgFRVVM/arcgis/rest/services/SeeClickFix_Requests_2021_Present_AutoUpdate_Test/FeatureServer/0/query?where=Id%20%3D%20%27${id}%27&outFields=Id,Summary,Rating,Address,Description,Agency_Name,Request_type,URL,Lat,Lng,Created_at_local,Closed_at_local,Assignee_name,Category,Report_Source,Acknowledged_at_local,Minutes_to_acknowledged,Minutes_to_closed&outSR=4326&f=json`
      );

      if (body.features.length === 0) {
        return interaction.editReply(
          "I'm sorry, but I couldn't find any requests associated with that ID. Please try again with a different ID."
        );
      }

      const attachment = new AttachmentBuilder("assets/logo.png");

      const createSearchEmbed = new EmbedBuilder()
        .setTitle(`SyrCityLine ${body.features[0].attributes.Category} Request`)
        .setAuthor({
          name: `${interaction.member.user.tag} | Request Followers - ${body.features[0].attributes.Rating}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        })
        .setDescription(
          `Description: ***${
            body.features[0].attributes.Description || "No Description Provided"
          }***`
        )
        .setThumbnail("attachment://logo.png")
        .setURL(body.features[0].attributes.URL)
        .setColor("Orange")
        .addFields(
          {
            name: "> Summary:",
            value: `${
              body.features[0].attributes.Summary || "No Summary provided"
            }`,
            inline: true,
          },
          {
            name: "> Address:",
            value: `${
              body.features[0].attributes.Address || "No Address provided"
            }`,
            inline: true,
          },
          {
            name: "> Source:",
            value: `${
              body.features[0].attributes.Report_Source || "No Source Provided"
            }`,
          },
          {
            name: "> Agency:",
            value: `${
              body.features[0].attributes.Agency_Name || "No Agency assigned"
            }`,
          },
          {
            name: "> Assignee:",
            value: `${
              body.features[0].attributes.Assignee_name || "No Assignee"
            }`,
          },
          {
            name: "> Latitude:",
            value: `${body.features[0].attributes.Lat || "N/A"}`,
            inline: true,
          },
          {
            name: "> Longitude :",
            value: `${body.features[0].attributes.Lng || "N/A"}`,
            inline: true,
          },
          {
            name: "> Acknowledged At:",
            value: `${
              body.features[0].attributes.Acknowledged_at_local || "N/A"
            }`,
            inline: false,
          },
          {
            name: "> Created At:",
            value: `${body.features[0].attributes.Created_at_local}`,
            inline: true,
          },
          {
            name: "> Closed At:",
            value: `${
              body.features[0].attributes.Closed_at_local || "Not closed yet"
            }`,
            inline: true,
          }
        )
        .setFooter({
          text: `Request ID - ${body.features[0].attributes.Id} | I would like to clarify that the Syracuse Data Challenge logo is the rightful property of its owner and is not affiliated with me or my bot.`,
        });

      await interaction.editReply({
        content: "",
        embeds: [createSearchEmbed],
        files: [attachment],
      });
    } catch (error) {
      console.error(error);
      interaction.editReply({
        content:
          "Unfortunately, there was an error while fetching data from the API. Please try again later.",
      });
    }
  },
};
