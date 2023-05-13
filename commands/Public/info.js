const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDMPermission(false)
    .setDescription("View information about this bot!"),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  execute(interaction, client) {
    try {
      const attachment = new AttachmentBuilder("assets/logo.png");

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Project's Github")
          .setStyle(ButtonStyle.Link)
          .setURL("https://github.com"),
        new ButtonBuilder()
          .setLabel("Developer's Website")
          .setStyle(ButtonStyle.Link)
          .setURL("https://josephcarmosino.website")
      );

      const info = new EmbedBuilder()
        .setTitle(`Infomation on ${client.user.username}`)
        .setAuthor({
          name: `${interaction.member.user.tag}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        })
        .setTimestamp()
        .setFooter({
          text: "I would like to clarify that the Syracuse Data Challenge logo is the rightful property of its owner and is not affiliated with me or my bot.",
        })
        .setThumbnail("attachment://logo.png")
        .setColor("Orange")
        .addFields(
          {
            name: "> Description:",
            value:
              "➥ The purpose of creating this bot was to participate in the May edition of the Syracuse Data Challenge.",
          },
          {
            name: "> Usage:",
            value:
              "➥ This bot utilizes the API provided by data.syr.gov to enable users to conveniently search for SYRCityline requests.",
          },
          {
            name: "> Developer's Disord:",
            value: "➥ joseph#5678",
          }
        );

      interaction.reply({
        embeds: [info],
        files: [attachment],
        components: [buttons],
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply("Error running this command!");
    }
  },
};
