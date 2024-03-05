const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chart")
    .setDescription("View charts about the data from SYRCityline!")
    .addSubcommand((options) =>
      options
        .setName("summary")
        .setDescription(
          "Retrieve a chart for the selected category over a selected year."
        )
        .addStringOption((options) =>
          options
            .setName("category")
            .setDescription("Please choose the category!")
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
        .addStringOption((options) =>
          options
            .setName("year")
            .setDescription("Please choose the year!")
            .addChoices(
              { name: "2024", value: "2024" },
              { name: "2023", value: "2023" },
              { name: "2022", value: "2022" },
              { name: "2021", value: "2021" }
            )
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("type")
            .setDescription(
              "Please choose the type of chart! Default - Bar Chart"
            )
            .addChoices(
              { name: "Bar Chart", value: "bar" },
              { name: "Line Chart", value: "line" },
              { name: "Pie Chart", value: "pie" },
              { name: "Doughnut Chart", value: "doughnut" },
              { name: "Polar Chart", value: "polarArea" }
            )
        )
    ),
};
