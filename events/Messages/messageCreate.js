const {
  Message,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   */
  async execute(message) {
    if (message.author.bot) return;
    if (message.author.id == process.env.id) return;

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Project's Github")
        .setStyle(ButtonStyle.Link)
        .setURL(
          "https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer"
        ),
      new ButtonBuilder()
        .setLabel("Developer's Website")
        .setStyle(ButtonStyle.Link)
        .setURL("https://josephcarmosino.com"),
      new ButtonBuilder()
        .setLabel("Invite Me")
        .setStyle(ButtonStyle.Link)
        .setURL(
          "https://www.josephcarmosino.com/invite-SYRCityline-Data-Explorer"
        )
    );

    if (message.channel.type == ChannelType.DM) {
      message.channel.send({
        content: `Sorry, ${message.author}, but you can only run commands in a server. Please join a server to use the commands.`,
        components: [buttons],
      });
      return;
    }
  },
};
