const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("request")
    .setDMPermission(false)
    .setDescription("View data from SYRCityline Requests!")
    .addSubcommand((options) =>
      options
        .setName("random")
        .setDescription("Retrieve a random request from SYRCityline Requests!")
        .addStringOption((options) =>
          options
            .setName("category")
            .setDescription(
              "Retrieve a random request from a category of your choosing!"
            )
            .addChoices(
              {
                name: "Pavement Markings",
                value: "Pavement Markings",
              },
              {
                name: "Potholes",
                value: "Potholes",
              },
              {
                name: "Sidewalks",
                value: "Sidewalks",
              },
              {
                name: "Street Lights",
                value: "Street Lights",
              },
              {
                name: "Parking Meters",
                value: "Parking Meter",
              },
              {
                name: "Dog Control",
                value: "Dog Control",
              },
              {
                name: "Road Kill",
                value: "RoadKill",
              },
              {
                name: "Construction Debris",
                value: "Construction Debris",
              },
              {
                name: "Graffiti on Private Land",
                value: "Graffiti on Private Land",
              },
              {
                name: "Graffiti on Public Land",
                value: "Graffiti on Public Land",
              },
              {
                name: "Illegal Setouts",
                value: "Illegal Setouts",
              },
              {
                name: "Vacant Buildings",
                value: "Vacant Buildings",
              },
              {
                name: "Tree Care and Removal",
                value: "Tree Care and Removal",
              },
              {
                name: "Sewer-related Concerns",
                value: "Sewer-related Concerns",
              },
              {
                name: "Water-related Concerns",
                value: "Water-related Concerns",
              }
            )
            .setRequired(true)
        )
    ),
};
