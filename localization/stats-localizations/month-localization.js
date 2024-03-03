// Locales for the stats month command
const locales = {
  "en-US": {
    embedtitle: (month, year) => `SYRCityline Requests for ${month}/${year}`,
    embeddescription: "The current request numbers for the current month.",
    embednumberofrequests: "> Number of Requests",
    embedrequests: "requests",
    embedmostreported: "> Most Reported Category",
    embedleastreported: "> Least Reported Category",
    embedtopthree: "> Top Three Categories",
  },
  "es-ES": {
    embedtitle: (month, year) =>
      `Solicitudes de SYRCityline para ${month}/${year}`,
    embeddescription: "El recuento actual de solicitudes para el mes actual.",
    embednumberofrequests: "> Número de Solicitudes",
    embedrequests: "solicitudes",
    embedmostreported: "> Categoría más reportada",
    embedleastreported: "> Categoría menos reportada",
    embedtopthree: "> Tres categorías principales",
  },
  "zh-CN": {
    embedtitle: (month, year) => `SYRCityline请求${month}/ ${year}`,
    embeddescription: "当前月份的当前请求数量。",
    embednumberofrequests: "> 请求数量",
    embedrequests: "请求",
    embedmostreported: "> 最多报告的类别",
    embedleastreported: "> 最少报告的类别",
    embedtopthree: "> 前三个类别",
  },
  fr: {
    embedtitle: (month, year) => `Demandes SYRCityline pour ${month}/${year}`,
    embeddescription: "Le nombre actuel de demandes pour le mois en cours.",
    embednumberofrequests: "> Nombre de demandes",
    embedrequests: "demandes",
    embedmostreported: "> Catégorie la plus signalée",
    embedleastreported: "> Catégorie la moins signalée",
    embedtopthree: "> Trois premières catégories",
  },
  uk: {
    embedtitle: (month, year) => `Запити SYRCityline на ${month}/${year}`,
    embeddescription: "Поточна кількість запитів для поточного місяця.",
    embednumberofrequests: "> Кількість запитів",
    embedrequests: "запити",
    embedmostreported: "> Найбільш звільнена категорія",
    embedleastreported: "> Найменш звільнена категорія",
    embedtopthree: "> Три найпопулярніші категорії",
  },
  it: {
    embedtitle: (month, year) => `Richieste SYRCityline per ${month}/${year}`,
    embeddescription: "Il numero attuale di richieste per il mese corrente.",
    embednumberofrequests: "> Numero di Richieste",
    embedrequests: "richieste",
    embedmostreported: "> Categoria più segnalata",
    embedleastreported: "> Categoria meno segnalata",
    embedtopthree: "> Top tre categorie",
  },
  vi: {
    embedtitle: (month, year) => `Yêu cầu SYRCityline cho ${month}/${year}`,
    embeddescription: "Số lượng yêu cầu hiện tại cho tháng hiện tại.",
    embednumberofrequests: "> Số lượng Yêu cầu",
    embedrequests: "yêu cầu",
    embedmostreported: "> Danh mục được báo cáo nhiều nhất",
    embedleastreported: "> Danh mục được báo cáo ít nhất",
    embedtopthree: "> Ba danh mục hàng đầu",
  },
  de: {
    embedtitle: (month, year) => `SYRCityline-Anfragen für ${month}/${year}`,
    embeddescription:
      "Die aktuellen Anforderungszahlen für den aktuellen Monat.",
    embednumberofrequests: "> Anzahl der Anfragen",
    embedrequests: "Anfragen",
    embedmostreported: "> Meist gemeldete Kategorie",
    embedleastreported: "> Am wenig sten gemeldete Kategorie",
    embedtopthree: "> Top drei Kategorien",
  },
};

module.exports = locales.monthlocalizations = locales;
