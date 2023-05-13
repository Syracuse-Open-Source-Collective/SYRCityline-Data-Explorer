const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription(
      "Checks if the bot is currently working if it doesn't reply it's not!"
    )
    .setDMPermission(false),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction) {
    interaction.reply({ content: "The bot is working! (:", ephemeral: true });
  },
};
