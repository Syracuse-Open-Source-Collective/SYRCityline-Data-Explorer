const { ChatInputCommandInteraction, Collection } = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
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

    const cooldownAmount = 5 * 1000;

    const timestamps = cooldowns.get(command.name) || new Collection();

    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      const remainingCooldown = (expirationTime - Date.now()) / 1000;

      if (Date.now() < expirationTime) {
        return interaction.reply({
          content: `Hey there! It looks like you've hit the usage limit for the /${
            command.data.name
          } command. Don't worry, you'll be able to use it again in ${remainingCooldown.toFixed(
            1
          )} seconds. Thanks for using the bot!`,
          ephemeral: true,
        });
      }
    }

    timestamps.set(interaction.user.id, Date.now());
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
    cooldowns.set(command.name, timestamps);

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
      console.error(error);
      interaction.reply({
        content:
          "We apologize for this error and assure you that we are working on resolving it promptly.",
        ephemeral: true,
      });
    }
  },
};
