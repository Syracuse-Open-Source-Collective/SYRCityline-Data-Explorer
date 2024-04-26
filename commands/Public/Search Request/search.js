const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDMPermission(false)
    .setDescription(
      "Retrieve SYRCityline Requests data for a specific address or ID or latitude and longitude!"
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
            .setDescription("Please provide the ID of the SYRCityline request.")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("lat-long")
        .setDescription(
          "Retrieve SYRCityline Requests for the given latitude and longitude."
        )
        .addStringOption((options) =>
          options
            .setName("latitude")
            .setDescription("Please provide the latitude of the location.")
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("longitude")
            .setDescription("Please provide the longitude of the location.")
            .setRequired(true)
        )
    ),
};
