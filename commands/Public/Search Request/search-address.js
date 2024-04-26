/**
 * Module dependencies
 */
const { ChatInputCommandInteraction } = require("discord.js");
const { mutipleRequests } = require("../../../functions/mutipleRequests");
const path = require("path");
const superagent = require("superagent");

/**
 * Constants
 */
const reply = require("../../../constants/replies");

/**
 * Expose subCommand
 */
module.exports = {
  subCommand: "search.address",

  /**
   * Execute function
   *
   * @param {ChatInputCommandInteraction} interaction - The command interaction
   */
  async execute(interaction) {
    try {
      // Defer reply
      await interaction.deferReply();

      // Get address
      const address = interaction.options.getString("address");

      // Inform user about data retrieval
      await interaction.followUp({
        content: reply["data.search"],
      });

      const { body } = await superagent.get(
        `https://services6.arcgis.com/bdPqSfflsdgFRVVM/arcgis/rest/services/SeeClickFix_Requests_2021_Present_AutoUpdate_Test/FeatureServer/0/query?where=Address%20%3D%20%27${address}%27&outFields=*&outSR=4326&f=json`
      );

      if (body.features.length === 0) {
        return interaction.editReply({
          content: reply["data.notFound.address"],
        });
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
      // Handle error
      interaction.editReply({
        content: reply["data.error"],
      });
    }
  },
};
