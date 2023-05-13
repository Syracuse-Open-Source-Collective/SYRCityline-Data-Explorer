const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDMPermission(false)
    .setDescription(
      "Retrieve SYRCityline Requests data for a specific address or ID!"
    )
    .addSubcommand((options) =>
      options
        .setName("address")
        .setDescription("Retrieve SYRCityline Requests for the given address.")
        .addStringOption((options) =>
          options
            .setName("address")
            .setDescription(
              "Please provide your full address in this format: 123 7th North St, Syracuse, New York, 13208."
            )
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("id")
        .setDescription("Retrieve SYRCityline Request for the given ID.")
        .addStringOption((options) =>
          options
            .setName("id")
            .setDescription(
              "Please provide the ID of the SYRCityline request in this format: 12737412."
            )
            .setRequired(true)
        )
    ),
};
