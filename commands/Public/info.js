const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
const infoLocalizations = require("../../localization/info-localizations");

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(false)
    .setName("info")
    .setNameLocalizations({
      "es-ES": "información",
      fr: "info",
      uk: "інформація",
      it: "informazioni",
      // vi: "thông tin", // error being thrown...? Has to do with regex?
      de: "info",
    })
    .setDescription("View information about this bot!")
    .setDescriptionLocalizations({
      "es-ES": "¡Vea información sobre este bot!",
      "zh-CN": "查看有关此机器人的信息！",
      fr: "Voir les informations sur ce bot !",
      uk: "Переглянути інформацію про цього бота!",
      it: "Visualizza informazioni su questo bot!",
      vi: "Xem thông tin về bot này!",
      de: "Informationen zu diesem Bot anzeigen!",
    }),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  execute(interaction, client) {
    try {
      const attachment = new AttachmentBuilder("assets/logo.png");

      const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(
            infoLocalizations[interaction.locale]["Project's Github"] ??
              infoLocalizations[infoLocalizations["en-US"]]["Project's Github"]
          )
          .setStyle(ButtonStyle.Link)
          .setURL(
            "https://github.com/Syracuse-Open-Source-Collective/SYRCityline-Data-Explorer"
          ),
        new ButtonBuilder()
          .setLabel(
            infoLocalizations[interaction.locale]["Developer's Website"] ??
              infoLocalizations[infoLocalizations["en-US"]][
                "Developer's Website"
              ]
          )
          .setStyle(ButtonStyle.Link)
          .setURL("https://josephcarmosino.com"),
        new ButtonBuilder()
          .setLabel(
            infoLocalizations[interaction.locale]["Invite Me"] ??
              infoLocalizations[infoLocalizations["en-US"]]["Invite Me"]
          )
          .setStyle(ButtonStyle.Link)
          .setURL(
            "https://www.josephcarmosino.com/invite-SYRCityline-Data-Explorer"
          )
      );

      const info = new EmbedBuilder()
        .setTitle(
          infoLocalizations[interaction.locale][
            "Information on SYRCityline-Data-Explorer"
          ] ?? `Information on ${client.user.username}`
        )
        .setAuthor({
          name: `${interaction.member.user.tag}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        })
        .setTimestamp()
        .setFooter({
          text:
            infoLocalizations[interaction.locale][
              "I would like to clarify that the Syracuse Data Challenge logo is the rightful property of its owner and is not affiliated with me or my bot."
            ] ??
            infoLocalizations[infoLocalizations["en-US"]][
              "I would like to clarify that the Syracuse Data Challenge logo is the rightful property of its owner and is not affiliated with me or my bot."
            ],
        })
        .setThumbnail("attachment://logo.png")
        .setColor("Orange")
        .addFields(
          {
            name:
              infoLocalizations[interaction.locale]["> Description"] ??
              infoLocalizations[infoLocalizations["en-US"]]["> Description"],
            value:
              infoLocalizations[interaction.locale][
                "➥ The purpose of creating this bot was to participate in the May edition of the Syracuse Data Challenge."
              ] ??
              infoLocalizations[infoLocalizations["en-US"]][
                "➥ The purpose of creating this bot was to participate in the May edition of the Syracuse Data Challenge."
              ],
          },
          {
            name:
              infoLocalizations[interaction.locale]["> Usage"] ?? "> Usage:",
            value:
              infoLocalizations[interaction.locale][
                "➥ This bot utilizes the API provided by data.syr.gov to enable users to conveniently search for SYRCityline requests."
              ] ??
              infoLocalizations[infoLocalizations["en-US"]][
                "➥ This bot utilizes the API provided by data.syr.gov to enable users to conveniently search for SYRCityline requests."
              ],
          },
          {
            name:
              infoLocalizations[interaction.locale][
                "> Developer's Discord: "
              ] ??
              infoLocalizations[infoLocalizations["en-US"]][
                "Developer's Discord: "
              ],
            value: "➥ josephistired.",
          }
        );

      interaction.reply({
        embeds: [info],
        files: [attachment],
        components: [buttons],
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      interaction.reply(
        infoLocalizations[interaction.locale]["Error running this command!"] ??
          "Error running this command!"
      );
    }
  },
};
