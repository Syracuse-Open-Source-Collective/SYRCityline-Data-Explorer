const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setNameLocalizations({
      "es-ES": "estadísticas",
      "zh-CN": "统计",
      fr: "statistiques",
      uk: "статистика",
      it: "statistiche",
      // vi: "thống kê",
      de: "statistiken",
    })
    .setDMPermission(false)
    .setDescription("View stats about the data from SYRCityline!")
    .addSubcommand((options) =>
      options
        .setName("month")
        .setNameLocalizations({
          "es-ES": "mes",
          "zh-CN": "月",
          fr: "mois",
          uk: "місяць",
          it: "mese",
          // vi: "tháng",
          de: "monat",
        })
        .setDescription(
          "Retrieve the stats for this month from SYRCityLine Requests!"
        )
        .setDescriptionLocalizations({
          "es-ES":
            "¡Obtenga las estadísticas de este mes de las solicitudes de SYRCityLine!",
          "zh-CN": "从SYRCityLine请求中检索本月的统计信息！",
          fr: "Obtenez les statistiques de ce mois à partir des demandes SYRCityLine !",
          uk: "Отримайте статистику за цей місяць з запитів SYRCityLine!",
          it: "Ottieni le statistiche di questo mese dalle richieste di SYRCityLine!",
          // vi: "Lấy thống kê cho tháng này từ các yêu cầu SYRCityLine!",
          de: "Rufen Sie die Statistiken für diesen Monat von den SYRCityLine-Anfragen ab!",
        })
    )
    .addSubcommand((options) =>
      options
        .setName("year")
        .setNameLocalizations({
          "es-ES": "año",
          "zh-CN": "年",
          fr: "année",
          uk: "рік",
          it: "anno",
          // vi: "năm",
          de: "jahr",
        })
        .setDescription(
          "Retrieve the stats for this year from SYRCityLine Requests!"
        )
        .setDescriptionLocalizations({
          "es-ES":
            "¡Obtenga las estadísticas de este año de las solicitudes de SYRCityLine!",
          "zh-CN": "从SYRCityLine请求中检索今年的统计信息！",
          fr: "Obtenez les statistiques de cette année à partir des demandes SYRCityLine !",
          uk: "Отримайте статистику за цей рік з запитів SYRCityLine!",
          it: "Ottieni le statistiche di quest'anno dalle richieste di SYRCityLine!",
          // vi: "Lấy thống kê cho năm nay từ các yêu cầu SYRCityLine!",
          de: "Rufen Sie die Statistiken für dieses Jahr von den SYRCityLine-Anfragen ab!",
        })
    )
    .addSubcommand((options) =>
      options
        .setName("query")
        .setNameLocalizations({
          "es-ES": "consulta",
          "zh-CN": "查询",
          fr: "question",
          uk: "запит",
          it: "richiesta",
          // vi: "truy vấn",
          de: "abfrage",
        })
        .setDescription(
          "Retrieve the stats for a given month plus year from SYRCityLine Requests!"
        )
        .setDescriptionLocalizations({
          "es-ES":
            "¡Obtenga las estadísticas de un mes y año dados de las solicitudes de SYRCityLine!",
          "zh-CN": "从SYRCityLine请求中检索给定月份和年份的统计信息！",
          fr: "Obtenez les statistiques pour un mois et une année donnés à partir des demandes SYRCityLine !",
          uk: "Отримайте статистику за вказаний місяць та рік з запитів SYRCityLine!",
          it: "Ottieni le statistiche per un dato mese e anno dalle richieste di SYRCityLine!",
          // vi: "Lấy thống kê cho một tháng cụ thể cộng với năm từ các yêu cầu SYRCityLine!",
          de: "Rufen Sie die Statistiken für einen bestimmten Monat plus Jahr von den SYRCityLine-Anfragen ab!",
        })
        .addStringOption((options) =>
          options
            .setName("month")
            .setNameLocalizations({
              "es-ES": "mes",
              "zh-CN": "月",
              fr: "mois",
              uk: "місяць",
              it: "mese",
              // vi: "tháng",
              de: "monat",
            })
            .setDescription("Please choose the month!")
            .setDescriptionLocalizations({
              "es-ES": "¡Por favor, elige el mes!",
              "zh-CN": "请选择月份！",
              fr: "Veuillez choisir le mois !",
              uk: "Будь ласка, виберіть місяць!",
              it: "Per favore, scegli il mese!",
              // vi: "Vui lòng chọn tháng!",
              de: "Bitte wählen Sie den Monat!",
            })
            .addChoices(
              { name: "January", value: "0" },
              { name: "February", value: "1" },
              { name: "March", value: "2" },
              { name: "April", value: "3" },
              { name: "May", value: "4" },
              { name: "June", value: "5" },
              { name: "July", value: "6" },
              { name: "August", value: "7" },
              { name: "September", value: "8" },
              { name: "October", value: "9" },
              { name: "November", value: "10" },
              { name: "December", value: "11" }
            )
            .setRequired(true)
        )
        .addStringOption((options) =>
          options
            .setName("year")
            .setNameLocalizations({
              "es-ES": "año",
              "zh-CN": "年",
              fr: "année",
              uk: "рік",
              it: "anno",
              // vi: "năm",
              de: "jahr",
            })
            .setDescription("Please choose the year!")
            .setDescriptionLocalizations({
              "es-ES": "¡Por favor, elige el año!",
              "zh-CN": "请选择年份！",
              fr: "Veuillez choisir l'année !",
              uk: "Будь ласка, виберіть рік!",
              it: "Per favore, scegli l'anno!",
              // vi: "Vui lòng chọn năm!",
              de: "Bitte wählen Sie das Jahr!",
            })
            .addChoices(
              { name: "2024", value: "2024" },
              { name: "2023", value: "2023" },
              { name: "2022", value: "2022" },
              { name: "2021", value: "2021" }
            )
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("overall")
        .setNameLocalizations({
          "es-ES": "global",
          "zh-CN": "整体",
          fr: "global",
          uk: "загальний",
          it: "complessivo",
          // vi: "toàn bộ",
          de: "gesamt",
        })
        .setDescription("Retrieve the overall stats from SYRCityLine Requests!")
        .setDescriptionLocalizations({
          "es-ES":
            "¡Obtenga las estadísticas generales de las solicitudes de SYRCityLine!",
          "zh-CN": "从SYRCityLine请求中检索总体统计信息！",
          fr: "Obtenez les statistiques générales des demandes SYRCityLine !",
          uk: "Отримайте загальну статистику з запитів SYRCityLine!",
          it: "Ottieni le statistiche generali dalle richieste di SYRCityLine!",
          // vi: "Lấy thống kê tổng quan từ các yêu cầu SYRCityLine!",
          de: "Rufen Sie die allgemeinen Statistiken von den SYRCityLine-Anfragen ab!",
        })
    ),
};
