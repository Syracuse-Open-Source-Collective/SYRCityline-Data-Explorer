// Locales for the stats query command
const locales = {
  "en-US": {
    embedtitle: (month, year) => `SYRCityline Requests for ${month}/${year}`,
    embeddescription: "The request count for your selected month, year.",
    embednumberofrequests: "> Number of Requests",
    embedmostreported: "> Most Reported Category",
    embedleastreported: "> Least Reported Category",
    embedrequests: "requests",
    embedtopreported: "> Top Three Categories",
  },
  "es-ES": {
    embedtitle: (month, year) =>
      `Solicitudes de SYRCityline para ${month}/${year}`,
    embeddescription:
      "El recuento de solicitudes para su mes y año seleccionados.",
    embednumberofrequests: "> Número de Solicitudes",
    embedmostreported: "> Categoría más reportada",
    embedleastreported: "> Categoría menos reportada",
    embedrequests: "solicitudes",
    embedtopreported: "> Tres categorías principales",
  },
  "zh-CN": {
    embedtitle: (month, year) => `SYRCityline请求${month}/ ${year}`,
    embeddescription: "您选择的月份和年份的请求计数。",
    embednumberofrequests: "> 请求数量",
    embedmostreported: "> 最多报告的类别",
    embedleastreported: "> 最少报告的类别",
    embedrequests: "请求",
    embedtopreported: "> 前三个类别",
  },
  fr: {
    embedtitle: (month, year) => `Demandes SYRCityline pour ${month}/${year}`,
    embeddescription:
      "Le nombre de demandes pour votre mois et année sélectionnés.",
    embednumberofrequests: "> Nombre de demandes",
    embedmostreported: "> Catégorie la plus signalée",
    embedleastreported: "> Catégorie la moins signalée",
    embedrequests: "demandes",
    embedtopreported: "> Trois premières catégories",
  },
  uk: {
    embedtitle: (month, year) => `Запити SYRCityline на ${month}/${year}`,
    embeddescription: "Кількість запитів для обраного вами місяця та року.",
    embednumberofrequests: "> Кількість запитів",
    embedmostreported: "> Найбільш звільнена категорія",
    embedleastreported: "> Найменш зв",
    embedrequests: "запити",
    embedtopreported: "> Три найпопулярніші категорії",
  },
  it: {
    embedtitle: (month, year) => `Richieste SYRCityline per ${month}/${year}`,
    embeddescription:
      "Il conteggio delle richieste per il mese e l'anno selezionati.",
    embednumberofrequests: "> Numero di Richieste",
    embedmostreported: "> Categoria più segnalata",
    embedleastreported: "> Categoria meno segnalata",
    embedrequests: "richieste",
    embedtopreported: "> Top tre categorie",
  },
  vi: {
    embedtitle: (month, year) => `Yêu cầu SYRCityline cho ${month}/${year}`,
    embeddescription: "Số lượng yêu cầu cho tháng và năm bạn chọn.",
    embednumberofrequests: "> Số lượng Yêu cầu",
    embedmostreported: "> Danh mục được báo cáo nhiều nhất",
    embedleastreported: "> Danh mục được báo cáo ít nhất",
    embedrequests: "yêu cầu",
    embedtopreported: "> Ba danh mục hàng đầu",
  },
  de: {
    embedtitle: (month, year) => `SYRCityline-Anfragen für ${month}/${year}`,
    embeddescription:
      "Die Anzahl der Anfragen für Ihren ausgewählten Monat und Ihr ausgewähltes Jahr.",
    embednumberofrequests: "> Anzahl der Anfragen",
    embedmostreported: "> Am meisten gemeldete Kategorie",
    embedleastreported: "> Am wenigsten gemeldete Kategorie",
    embedrequests: "Anfragen",
    embedtopreported: "> Top drei Kategorien",
  },
};

module.exports = locales.querylocalizations = locales;
