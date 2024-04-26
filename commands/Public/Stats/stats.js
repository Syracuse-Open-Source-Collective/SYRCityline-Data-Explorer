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
    .setDescriptionLocalizations({
      "es-ES": "¡Vea estadísticas sobre los datos de SYRCityline!",
      "zh-CN": "查看有关SYRCityline数据的统计信息！",
      fr: "Voir les statistiques sur les données de SYRCityline !",
      uk: "Перегляньте статистику про дані від SYRCityline!",
      it: "Visualizza le statistiche sui dati di SYRCityline!",
      // vi: "Xem thống kê về dữ liệu từ SYRCityline!",
      de: "Sehen Sie sich Statistiken zu den Daten von SYRCityline an!",
    })
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
              {
                name: "January",
                name_localizations: {
                  "es-ES": "enero",
                  "zh-CN": "一月",
                  fr: "janvier",
                  uk: "січень",
                  it: "gennaio",
                  de: "Januar",
                },
                value: "1",
              },
              {
                name: "February",
                name_localizations: {
                  "es-ES": "febrero",
                  "zh-CN": "二月",
                  fr: "février",
                  uk: "лютий",
                  it: "febbraio",
                  de: "Februar",
                },
                value: "2",
              },
              {
                name: "March",
                name_localizations: {
                  "es-ES": "marzo",
                  "zh-CN": "三月",
                  fr: "mars",
                  uk: "березень",
                  it: "marzo",
                  de: "März",
                },
                value: "3",
              },
              {
                name: "April",
                name_localizations: {
                  "es-ES": "abril",
                  "zh-CN": "四月",
                  fr: "avril",
                  uk: "квітень",
                  it: "aprile",
                  de: "April",
                },
                value: "4",
              },
              {
                name: "May",
                name_localizations: {
                  "es-ES": "mayo",
                  "zh-CN": "五月",
                  fr: "mai",
                  uk: "травень",
                  it: "maggio",
                  de: "Mai",
                },
                value: "5",
              },
              {
                name: "June",
                name_localizations: {
                  "es-ES": "junio",
                  "zh-CN": "六月",
                  fr: "juin",
                  uk: "червень",
                  it: "giugno",
                  de: "Juni",
                },
                value: "6",
              },
              {
                name: "July",
                name_localizations: {
                  "es-ES": "julio",
                  "zh-CN": "七月",
                  fr: "juillet",
                  uk: "липень",
                  it: "luglio",
                  de: "Juli",
                },
                value: "7",
              },
              {
                name: "August",
                name_localizations: {
                  "es-ES": "agosto",
                  "zh-CN": "八月",
                  fr: "août",
                  uk: "серпень",
                  it: "agosto",
                  de: "August",
                },
                value: "8",
              },
              {
                name: "September",
                name_localizations: {
                  "es-ES": "septiembre",
                  "zh-CN": "九月",
                  fr: "septembre",
                  uk: "вересень",
                  it: "settembre",
                  de: "September",
                },
                value: "9",
              },
              {
                name: "October",
                name_localizations: {
                  "es-ES": "octubre",
                  "zh-CN": "十月",
                  fr: "octobre",
                  uk: "жовтень",
                  it: "ottobre",
                  de: "Oktober",
                },
                value: "10",
              },
              {
                name: "November",
                name_localizations: {
                  "es-ES": "noviembre",
                  "zh-CN": "十一月",
                  fr: "novembre",
                  uk: "листопад",
                  it: "novembre",
                  de: "November",
                },
                value: "11",
              },
              {
                name: "December",
                name_localizations: {
                  "es-ES": "diciembre",
                  "zh-CN": "十二月",
                  fr: "décembre",
                  uk: "грудень",
                  it: "dicembre",
                  de: "Dezember",
                },
                value: "12",
              }
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
