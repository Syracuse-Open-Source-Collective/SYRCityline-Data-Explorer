const { ChatInputCommandInteraction } = require("discord.js");
const superagent = require("superagent");
const { mutipleRequests } = require("../../../functions/mutipleRequests");

module.exports = {
  subCommand: "search.address",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const address = interaction.options.getString("address");

      await interaction.followUp({
        content:
          "I am currently retrieving the necessary data from the API. Please bear with me for a moment!",
      });

      const { body } = await superagent.get(
        `https://services6.arcgis.com/bdPqSfflsdgFRVVM/arcgis/rest/services/SeeClickFix_Requests_2021_Present_AutoUpdate_Test/FeatureServer/0/query?where=Address%20%3D%20%27${address}%27&outFields=*&outSR=4326&f=json`
      );

      if (body.error === true) {
        return interaction.editReply({
          content:
            "Unfortunately, there was an error while fetching data from the API. Please try again later.",
        });
      }

      if (body.features.length === 0) {
        return interaction.editReply(
          "I'm sorry, but I couldn't find any requests associated with that address. Please try again with a different address."
        );
      }

      const requests = body.features.map((feature) => {
        return {
          id: feature.attributes.Id,
          category: feature.attributes.Category,
          followers: feature.attributes.Rating,
          description: feature.attributes.Description,
          url: feature.attributes.URL,
          summary: feature.attributes.Summary,
          address: feature.attributes.Address,
          source: feature.attributes.Report_Source,
          agency: feature.attributes.Agency_Name,
          assignee: feature.attributes.Assignee_name,
          latitude: feature.attributes.Lat,
          longitude: feature.attributes.Lng,
          acknowledgedat: feature.attributes.Acknowledged_at_local,
          createdat: feature.attributes.Created_at_local,
          closedat: feature.attributes.Closed_at_local,
        };
      });

      await mutipleRequests(interaction, requests);
    } catch (error) {
      console.error(error);
      interaction.editReply({
        content:
          "Unfortunately, there was an error while fetching data from the API. Please try again later.",
      });
    }
  },
};
