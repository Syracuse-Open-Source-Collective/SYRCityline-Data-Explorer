const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

async function randomRequestSelectMenu(interaction, choice) {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("starter")
      .setPlaceholder(choice)
      .addOptions(
        new StringSelectMenuOptionBuilder()
          .setLabel("Pavement Markings")
          .setDescription("Show a random Pavement Markings request!")
          .setValue("Pavement Markings"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Potholes")
          .setDescription("Show a random Potholes request!")
          .setValue("Potholes"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Sidewalks")
          .setDescription("Show a random Sidewalks request!")
          .setValue("Sidewalks"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Street Lights")
          .setDescription("Show a random Street Lights request!")
          .setValue("Street Lights"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Parking Meters")
          .setDescription("Show a random Parking Meters request!")
          .setValue("Parking Meters"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Dog Control")
          .setDescription("Show a random Dog Control request!")
          .setValue("Dog Control"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Road Kill")
          .setDescription("Show a random Road Kill request!")
          .setValue("RoadKill"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Construction Debris")
          .setDescription("Show a random Construction Debris request!")
          .setValue("Construction Debris"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Graffiti on Private Land")
          .setDescription("Show a random Graffiti on Private Land request!")
          .setValue("Graffiti on Private Land"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Graffiti on Public Land")
          .setDescription("Show a random Graffiti on Public Land request!")
          .setValue("Graffiti on Public Land"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Illegal Setouts")
          .setDescription("Show a random Illegal Setouts request!")
          .setValue("Illegal Setouts"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Vacant Buildings")
          .setDescription("Show a random Vacant Buildings request!")
          .setValue("Vacant Buildings"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Tree Care and Removals")
          .setDescription("Show a random Tree Care and Removals request!")
          .setValue("Tree Care and Removal"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Sewer-related Concerns")
          .setDescription("Show a random Sewer-related Concerns request!")
          .setValue("Sewer-related Concerns"),
        new StringSelectMenuOptionBuilder()
          .setLabel("Water-related Concerns")
          .setDescription("Show a random Water-related Concerns request!")
          .setValue("Water-related Concerns")
      )
  );
}

module.exports = { randomRequestSelectMenu };
