const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const { fetchAllRecords } = require("../../../functions/fetchAllReconds");

module.exports = {
  subCommand: "stats.query",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      await interaction.deferReply();

      const month = interaction.options.getString("month");
      const year = interaction.options.getString("year");

      await interaction.followUp({
        content:
          "I am currently retrieving the necessary data from the API. Please bear with me for a moment!",
      });

      fetchAllRecords().then((allRecords) => {
        const wantedDate = new Date();
        wantedDate.setFullYear(year);
        wantedDate.setMonth(month);
        const wantedYear = wantedDate.getFullYear();
        const wantedMonth = wantedDate.getMonth();
        const realcurrentMonth = (wantedMonth + 1).toString().padStart(2, "0");

        let count = 0;
        let categoryCounts = {};

        allRecords.forEach((feature) => {
          const createdAt = feature.attributes.Created_at_local;
          const createdAtObj = createdAt.split(" ")[0];
          const recordYear = new Date(createdAtObj).getFullYear();
          const recordMonth = new Date(createdAtObj).getMonth();

          if (recordMonth === wantedMonth && recordYear === wantedYear) {
            count++;
            const category = feature.attributes.Category;
            if (categoryCounts[category]) {
              categoryCounts[category]++;
            } else {
              categoryCounts[category] = 1;
            }
          }
        });

        if (count === 0) {
          interaction.editReply(
            `We had an error finding any requests for ${realcurrentMonth}/${wantedYear}!`
          );
          return;
        }

        const sortedCategories = Object.keys(categoryCounts).sort(
          (a, b) => categoryCounts[b] - categoryCounts[a]
        );
        const topCategories = sortedCategories.slice(0, 3);

        const attachment = new AttachmentBuilder("assets/logo.png");

        const queryembed = new EmbedBuilder()
          .setTitle(
            `SyrCityLine Request Stats For ${realcurrentMonth}/${wantedYear}`
          )
          .setAuthor({
            name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
            iconURL: `${interaction.user.displayAvatarURL()}`,
          })
          .setDescription(`The request count for your selected month, year.`)
          .setThumbnail("attachment://logo.png")
          .setColor("Orange")
          .addFields(
            {
              name: "> Number of Requests:",
              value: `${count}`,
              inline: true,
            },
            {
              name: "> Most Reported Category:",
              value: `${sortedCategories[0]} (${
                categoryCounts[sortedCategories[0]]
              } requests)`,
            },
            {
              name: "> Least Reported Category:",
              value: `${sortedCategories[sortedCategories.length - 1]} (${
                categoryCounts[sortedCategories[sortedCategories.length - 1]]
              } requests)`,
            },
            {
              name: "> Top Three Categories:",
              value: topCategories
                .map(
                  (category) =>
                    `${category} (${categoryCounts[category]} requests)`
                )
                .join("\n"),
            }
          );

        interaction.editReply({
          embeds: [queryembed],
          content: " ",
          files: [attachment],
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
