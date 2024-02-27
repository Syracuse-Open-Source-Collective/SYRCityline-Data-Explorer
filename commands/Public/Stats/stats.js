const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDMPermission(false)
    .setDescription("View stats about the data from SYRCityline!")
    .addSubcommand((options) =>
      options
        .setName("month")
        .setDescription(
          "Retrieve the stats for this month from SYRCityLine Requests!"
        )
    )
    .addSubcommand((options) =>
      options
        .setName("year")
        .setDescription(
          "Retrieve the stats for this year from SYRCityLine Requests!"
        )
    )
    .addSubcommand((options) =>
      options
        .setName("query")
        .setDescription(
          "Retrieve the stats for a given month plus year from SYRCityLine Requests!"
        )
        .addStringOption((options) =>
          options
            .setName("month")
            .setDescription("Please choose the month!")
            .addChoices(
              { name: "January", value: "0" },
              { name: "February", value: "1" },
              { name: "March", value: "2" },
              { name: "April", value: "3" },
              { name: "May", value: "4" },
              { name: "June", value: "5" },
              { name: "July", value: "6" },
              { name: "August", value: "7" },
              { name: "September", value: "8" },
              { name: "October", value: "9" },
              { name: "November", value: "10" },
              { name: "December", value: "11" }
            )
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("year")
            .setDescription("Please choose the year!")
            .addChoices(
              { name: "2024", value: "2024"},
              { name: "2023", value: "2023" },
              { name: "2022", value: "2022" },
              { name: "2021", value: "2021" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("overall")
        .setDescription(
          "Retrieve the overall stats from SYRCityLine Requests!"
        )
    )
};
