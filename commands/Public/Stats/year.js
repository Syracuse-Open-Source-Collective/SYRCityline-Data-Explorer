const {
  ChatInputCommandInteraction,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const { fetchAllRecords } = require("../../../functions/fetchAllReconds");

module.exports = {
  subCommand: "stats.year",
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      await interaction.deferReply();

      await interaction.followUp({
        content:
          "I am currently retrieving the necessary data from the API. Please bear with me for a moment!",
      });

      const categoryCounts = {};

      fetchAllRecords().then((allRecords) => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        let count = 0;

        allRecords.forEach((feature) => {
          const createdAt = feature.attributes.Created_at_local;
          const createdAtObj = createdAt.split(" ")[0];
          const date = new Date(createdAtObj);
          const year = date.getFullYear();

          if (year === currentYear) {
            count++;
            const category = feature.attributes.Category;
            if (categoryCounts[category]) {
              categoryCounts[category]++;
            } else {
              categoryCounts[category] = 1;
            }
          }
        });

        const sortedCategories = Object.keys(categoryCounts).sort(
          (a, b) => categoryCounts[b] - categoryCounts[a]
        );
        const topCategories = sortedCategories.slice(0, 3);

        const attachment = new AttachmentBuilder("assets/logo.png");

        const monthembed = new EmbedBuilder()
          .setTitle(`SyrCityLine Request Stats For ${currentYear}`)
          .setAuthor({
            name: `${interaction.member.user.tag} | ${interaction.member.user.id}`,
            iconURL: `${interaction.user.displayAvatarURL()}`,
          })
          .setDescription(`The current request numbers for the current year.`)
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
          embeds: [monthembed],
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
