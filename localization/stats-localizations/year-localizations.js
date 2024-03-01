// Locales for the stats year command
const locales = {
  "en-US": {
    embedtitle: (year) => `SYRCityline Requests for ${year}`,
    embeddescription: "The current request numbers for the current year.",
    embednumberofrequests: "Number of Requests",
    embedmostreported: "Most Reported Category",
    embedleastreported: "Least Reported Category",
    embedtopthree: "Top Three Categories",
    embedrequests: "requests",
  },
  "es-ES": {
    // spanish
    embedtitle: (year) => `Solicitudes de SYRCityline para ${year}`,
    embeddescription: "Los números de solicitud actuales para el año en curso.",
    embednumberofrequests: "Número de Solicitudes",
    embedmostreported: "Categoría más reportada",
    embedleastreported: "Categoría menos reportada",
    embedtopthree: "Tres categorías principales",
    embedrequests: "solicitudes",
  },
  "zh-CN": {
    // chinese
    embedtitle: (year) => `SYRCityline请求${year}`,
    embeddescription: "当前年度的当前请求数量。",
    embednumberofrequests: "请求数量",
    embedmostreported: "最多报告的类别",
    embedleastreported: "最少报告的类别",
    embedtopthree: "前三个类别",
    embedrequests: "请求",
  },
  fr: {
    // french
    embedtitle: (year) => `Demandes SYRCityline pour ${year}`,
    embeddescription: "Les numéros de demande actuels pour l'année en cours.",
    embednumberofrequests: "Nombre de demandes",
    embedmostreported: "Catégorie la plus signalée",
    embedleastreported: "Catégorie la moins signalée",
    embedtopthree: "Trois premières catégories",
    embedrequests: "demandes",
  },
  uk: {
    // ukrainian
    embedtitle: (year) => `Запити SYRCityline на ${year}`,
    embeddescription: "Поточні",
    embednumberofrequests: "Кількість запитів",
    embedmostreported: "Найбільш звільнена категорія",
    embedleastreported: "Найменш зв",
    embedtopthree: "Три найпопулярніші категорії",
    embedrequests: "запити",
  },
  it: {
    // italian
    embedtitle: (year) => `Richieste SYRCityline per ${year}`,
    embeddescription: "I numeri di richiesta attuali per l'anno in corso.",
    embednumberofrequests: "Numero di Richieste",
    embedmostreported: "Categoria più segnalata",
    embedleastreported: "Categoria meno segnalata",
    embedtopthree: "Top tre categorie",
    embedrequests: "richieste",
  },
  vi: {
    // vietnamese
    embedtitle: (year) => `Yêu cầu SYRCityline cho ${year}`,
    embeddescription: "Số yêu cầu hiện tại cho năm hiện tại.",
    embednumberofrequests: "Số lượng Yêu cầu",
    embedmostreported: "Danh mục được báo cáo nhiều nhất",
    embedleastreported: "Danh mục ít được báo cáo nhất",
    embedtopthree: "Ba danh mục hàng đầu",
    embedrequests: "yêu cầu",
  },
  de: {
    // german
    embedtitle: (year) => `SYRCityline-Anfragen für ${year}`,
    embedtitle: "Die aktuellen Anforderungszahlen für das laufende Jahr.",
    embednumberofrequests: "Anzahl der Anfragen",
    embedmostreported: "Am meisten gemeldete Kategorie",
    embedleastreported: "Am wenigsten gemeldete Kategorie",
    embedtopthree: "Top Drei Kategorien",
    embedrequests: "Anfragen",
  },
};

module.exports = locales.yearlocalizations = locales;
