const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("request")
    .setNameLocalizations({
      "es-ES": "solicitud",
      "zh-CN": "请求",
      fr: "demande",
      uk: "запит",
      it: "richiesta",
      de: "anfrage",
    })
    .setDMPermission(false)
    .setDescription("View data from SYRCityline Requests!")
    .setDescriptionLocalizations({
      "es-ES": "¡Vea los datos de las solicitudes de SYRCityline!",
      "zh-CN": "查看SYRCityline请求的数据！",
      fr: "Voir les données des demandes SYRCityline!",
      uk: "Переглянути дані запитів SYRCityline!",
      it: "Visualizza i dati delle richieste di SYRCityline!",
      de: "Daten von SYRCityline-Anfragen anzeigen!",
    })
    .addSubcommand((options) =>
      options
        .setName("random")
        .setNameLocalizations({
          "es-ES": "aleatorio",
          "zh-CN": "随机",
          fr: "aléatoire",
          uk: "випадковий",
          it: "casuale",
          de: "zufällig",
        })
        .setDescription("Retrieve a random request from SYRCityline Requests!")
        .setDescriptionLocalizations({
          "es-ES":
            "¡Recupere una solicitud aleatoria de las solicitudes de SYRCityline!",
          "zh-CN": "从SYRCityline请求中检索随机请求！",
          fr: "Récupérez une demande aléatoire des demandes SYRCityline!",
          uk: "Отримайте випадковий запит з запитів SYRCityline!",
          it: "Recupera una richiesta casuale dalle richieste di SYRCityline!",
          de: "Rufen Sie eine zufällige Anfrage von SYRCityline-Anfragen ab!",
        })
        .addStringOption((options) =>
          options
            .setName("category")
            .setNameLocalizations({
              "es-ES": "categoría",
              "zh-CN": "类别",
              fr: "catégorie",
              uk: "категорія",
              it: "categoria",
              de: "kategorie",
            })
            .setDescription(
              "Retrieve a random request from a category of your choosing!"
            )
            .setDescriptionLocalizations({
              "es-ES":
                "¡Recupere una solicitud aleatoria de una categoría de su elección!",
              "zh-CN": "从您选择的类别中检索随机请求！",
              fr: "Récupérez une demande aléatoire d'une catégorie de votre choix!",
              uk: "Отримайте випадковий запит з категорії за вашим вибором!",
              it: "Recupera una richiesta casuale da una categoria a tua scelta!",
              de: "Rufen Sie eine zufällige Anfrage aus einer Kategorie Ihrer Wahl ab!",
            })
            .addChoices(
              {
                name: "Pavement Markings",
                name_localizations: {
                  "es-ES": "Marcas de pavimento",
                  "zh-CN": "路面标线",
                  fr: "Marquages au sol",
                  uk: "Маркування дорожнього покриття",
                  it: "Segni sul marciapiede",
                  de: "Pflastermarkierungen",
                },
                value: "Pavement Markings",
              },
              {
                name: "Potholes",
                name_localizations: {
                  "es-ES": "Baches",
                  "zh-CN": "坑洼",
                  fr: "Nids-de-poule",
                  uk: "Ямки",
                  it: "Buche",
                  de: "Schlaglöcher",
                },
                value: "Potholes",
              },
              {
                name: "Sidewalks",
                name_localizations: {
                  "es-ES": "Acera",
                  "zh-CN": "人行道",
                  fr: "Trottoirs",
                  uk: "Тротуари",
                  it: "Marciapiedi",
                  de: "Gehwege",
                },
                value: "Sidewalks",
              },
              {
                name: "Street Lights",
                name_localizations: {
                  "es-ES": "Luces de la calle",
                  "zh-CN": "路灯",
                  fr: "Lampadaires",
                  uk: "Вуличні ліхтарі",
                  it: "Luci stradali",
                  de: "Straßenbeleuchtung",
                },
                value: "Street Lights",
              },
              {
                name: "Parking Meters",
                name_localizations: {
                  "es-ES": "Parquímetros",
                  "zh-CN": "停车计时器",
                  fr: "Parcmètres",
                  uk: "Паркомати",
                  it: "Parcometri",
                  de: "Parkuhren",
                },
                value: "Parking Meter",
              },
              {
                name: "Dog Control",
                name_localizations: {
                  "es-ES": "Control de perros",
                  "zh-CN": "狗控制",
                  fr: "Contrôle des chiens",
                  uk: "Контроль за собаками",
                  it: "Controllo dei cani",
                  de: "Hundekontrolle",
                },
                value: "Dog Control",
              },
              {
                name: "Road Kill",
                name_localizations: {
                  "es-ES": "Animales atropellados",
                  "zh-CN": "路上的动物尸体",
                  fr: "Animaux écrasés",
                  uk: "Тварини, збиті на дорозі",
                  it: "Animali investiti",
                  de: "RoadKill",
                },
                value: "Roadkill",
              },
              {
                name: "Construction Debris",
                name_localizations: {
                  "es-ES": "Escombros de construcción",
                  "zh-CN": "建筑垃圾",
                  fr: "Débris de construction",
                  uk: "Будівельні відходи",
                  it: "Detriti di costruzione",
                  de: "Bauschutt",
                },
                value: "Construction Debris",
              },
              {
                name: "Graffiti on Private Land",
                name_localizations: {
                  "es-ES": "Grafiti en terreno privado",
                  "zh-CN": "私人土地上的涂鸦",
                  fr: "Graffiti sur terrain privé",
                  uk: "Графіті на приватній землі",
                  it: "Graffiti su terreno privato",
                  de: "Graffiti auf Privatgrundstücken",
                },
                value: "Graffiti on Private Land",
              },
              {
                name: "Graffiti on Public Land",
                name_localizations: {
                  "es-ES": "Grafiti en terreno público",
                  "zh-CN": "公共土地上的涂鸦",
                  fr: "Graffiti sur terrain public",
                  uk: "Графіті на публічній землі",
                  it: "Graffiti su terreno pubblico",
                  de: "Graffiti auf öffentlichem Grund",
                },
                value: "Graffiti on Public Land",
              },
              {
                name: "Illegal Setouts",
                name_localizations: {
                  "es-ES": "Colocaciones ilegales",
                  "zh-CN": "非法设置",
                  fr: "Mise en place illégale",
                  uk: "Незаконні встановлення",
                  it: "Installazioni illegali",
                  de: "Illegale Aufstellungen",
                },
                value: "Illegal Setouts",
              },
              {
                name: "Vacant Buildings",
                name_localizations: {
                  "es-ES": "Edificios vacantes",
                  "zh-CN": "空置建筑",
                  fr: "Bâtiments vacants",
                  uk: "Вакантні будівлі",
                  it: "Edifici vuoti",
                  de: "Leerstehende Gebäude",
                },
                value: "Vacant Buildings",
              },
              {
                name: "Tree Care and Removal",
                name_localizations: {
                  "es-ES": "Cuidado y eliminación de árboles",
                  "zh-CN": "树木护理和清除",
                  fr: "Soins et abattage d'arbres",
                  uk: "Догляд і видалення дерев",
                  it: "Cura e rimozione degli alberi",
                  de: "Baumpflege und -entfernung",
                },
                value: "Tree Care and Removal",
              },
              {
                name: "Sewer-related Concerns",
                name_localizations: {
                  "es-ES": "Preocupaciones relacionadas con el alcantarillado",
                  "zh-CN": "与下水道有关的问题",
                  fr: "Préoccupations liées aux égouts",
                  uk: "Питання, пов'язані з каналізацією",
                  it: "Preoccupazioni relative ai fogni",
                  de: "Kanalbezogene Bedenken",
                },
                value: "Sewer-related Concerns",
              },
              {
                name: "Water-related Concerns",
                name_localizations: {
                  "es-ES": "Preocupaciones relacionadas con el agua",
                  "zh-CN": "与水有关的问题",
                  fr: "Préoccupations liées à l'eau",
                  uk: "Питання, пов'язані з водою",
                  it: "Preoccupazioni relative all'acqua",
                  de: "Wasserbezogene Bedenken",
                },
                value: "Water-related Concerns",
              }
            )
            .setRequired(true)
        )
    ),
};
