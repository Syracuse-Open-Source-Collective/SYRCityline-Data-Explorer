const {
  ChatInputCommandInteraction,
  Collection,
  PermissionFlagsBits,
} = require("discord.js");
require("dotenv").config();
module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    try {
      if (!command) {
        interaction.reply({
          content:
            "This command has become obsolete. Please try again at a later time.",
          ephemeral: true,
        });
        return;
      }

      if (command.developer && interaction.user.id !== process.env.id) {
        interaction.reply({
          content:
            "This command is exclusively for the use of the bot developer",
          ephemeral: true,
        });
        return;
      }
    } catch (error) {
      console.error(
        "An error occurred while listening for the interactionCreate event.",
        error
      );
    }

    const { cooldowns } = client;
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = 5 * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const expiredTimestamp = Math.round(expirationTime / 1000);
        return interaction.reply({
          content: `Hey there! It looks like you've hit the usage limit for the /${command.data.name} command. Don't worry, you'll be able to use it again in <t:${expiredTimestamp}:R>. Thanks for using the bot!`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    try {
      const subCommand = interaction.options.getSubcommand(false);
      if (subCommand) {
        const subCommandFile = client.subCommands.get(
          `${interaction.commandName}.${subCommand}`
        );
        if (!subCommandFile)
          return interaction.reply({
            content:
              "This subcommand is currently outdated. Please try again at a later time",
            ephemeral: true,
          });
        subCommandFile.execute(interaction, client);
      } else command.execute(interaction, client);
    } catch (error) {
      interaction.reply({
        content:
          "We apologize for this error and assure you that we are working on resolving it promptly.",
        ephemeral: true,
      });
    }
  },
};
