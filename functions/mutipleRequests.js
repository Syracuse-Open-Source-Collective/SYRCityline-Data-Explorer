const {
  ActionRowBuilder,
  AttachmentBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  EmbedBuilder,
} = require("discord.js");

async function mutipleRequests(interaction, requests) {
  let currentPage = 0;
  const totalPages = requests.length;

  const attachment = new AttachmentBuilder("assets/logo.png");

  const createRequestEmbed = (currentPage) =>
    new EmbedBuilder()
      .setTitle(`SyrCityLine ${requests[currentPage].category} Request`)
      .setAuthor({
        name: `${interaction.member.user.tag} | Request Followers - ${requests[currentPage].followers}`,
        iconURL: `${interaction.user.displayAvatarURL()}`,
      })
      .setDescription(
        `Description: ***${
          requests[currentPage].description || "No Description Provided"
        }***`
      )
      .setThumbnail("attachment://logo.png")
      .setURL(requests[currentPage].url)
      .setColor("Orange")
      .addFields(
        {
          name: "> Summary:",
          value: `${requests[currentPage].summary || "No Summary provided"}`,
          inline: true,
        },
        {
          name: "> Address:",
          value: `${requests[currentPage].address || "No Address provided"}`,
          inline: true,
        },
        {
          name: "> Source:",
          value: `${requests[currentPage].source || "No Source Provided"}`,
        },
        {
          name: "> Agency:",
          value: `${requests[currentPage].agency || "No Agency assigned"}`,
        },
        {
          name: "> Assignee:",
          value: `${requests[currentPage].assignee || "No Assignee"}`,
        },
        {
          name: "> Latitude:",
          value: `${requests[currentPage].latitude || "N/A"}`,
          inline: true,
        },
        {
          name: "> Longitude :",
          value: `${requests[currentPage].longitude || "N/A"}`,
          inline: true,
        },
        {
          name: "> Acknowledged At:",
          value: `${requests[currentPage].acknowledgedat || "N/A"}`,
          inline: false,
        },
        {
          name: "> Created At:",
          value: `${requests[currentPage].createdat}`,
          inline: true,
        },
        {
          name: "> Closed At:",
          value: `${requests[currentPage].closedat || "Not closed yet"}`,
          inline: true,
        }
      )
      .setFooter({
        text: `Request ID - ${requests[currentPage].id} | I would like to clarify that the Syracuse Data Challenge logo is the rightful property of its owner and is not affiliated with me or my bot.`,
      });

  const backButton = new ButtonBuilder()
    .setLabel("⫷")
    .setStyle(ButtonStyle.Success)
    .setCustomId("back");

  const forwardButton = new ButtonBuilder()
    .setLabel("⫸")
    .setStyle(ButtonStyle.Success)
    .setCustomId("forward");

  const buttons = new ActionRowBuilder().addComponents(
    backButton,
    forwardButton
  );

  const requestEmbed = createRequestEmbed(currentPage);

  const message = await interaction.editReply({
    content: "",
    embeds: [requestEmbed],
    files: [attachment],
    components: [buttons],
  });

  const userID = interaction.user.id;
  const command = interaction.commandName;

  const collector = message.createMessageComponentCollector({
    componentType: ComponentType.Button,
    time: 15000,
  });

  collector.on("collect", async (interaction) => {
    if (interaction.user.id !== userID) {
      await interaction.reply({
        content: `You cannot use this button as you did not initiate the command. Run \`/${command}\`!`,
        ephemeral: true,
      });
      return;
    }

    if (interaction.customId === "back") {
      currentPage--;
    } else if (interaction.customId === "forward") {
      currentPage++;
    }

    if (currentPage < 0) {
      currentPage = totalPages - 1;
    } else if (currentPage >= totalPages) {
      currentPage = 0;
    }

    const updatedRequestEmbed = createRequestEmbed(currentPage);

    await interaction.update({
      embeds: [updatedRequestEmbed],
      components: [buttons],
    });

    collector.on("end", () => {
      buttons.components.forEach((component) => {
        component.setDisabled(true);
      });

      message.edit({
        components: [buttons],
      });
    });
  });
}

module.exports = { mutipleRequests };
