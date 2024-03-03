// Locales for the random request command
const locales = {
  "en-US": {
    embedtitle: (category) => `SyrCityLine ${category} Request`,
    embedauthor: (interaction, requestedData) =>
      `${interaction.user.tag} | Request Followers - ${requestedData.Rating}`,
    embeddescription: (requestedData) =>
      `Description: ***${
        requestedData.Description
          ? requestedData.Description
          : "No description provided"
      }***`,
    embedsummary: (requestedData) => ({
      name: "> Summary",
      value: requestedData.Summary
        ? requestedData.Summary
        : "No summary provided",
    }),
  },
  "es-ES": {
    embedtitle: (category) => `SyrCityLine ${category} Solicitud`,
    embedauthor: (interaction, requestedData) =>
      `${interaction.user.tag} | Seguidores de solicitud - ${requestedData.Rating}`,
    embeddescription: (requestedData) =>
      `Descripción: ***${
        requestedData.Description
          ? requestedData.Description
          : "No se proporcionó descripción"
      }***`,
    embedsummary: (requestedData) => ({
      name: "> Resumen",
      value: requestedData.Summary
        ? requestedData.Summary
        : "No se proporcionó resumen",
    }),
  },
  "zh-CN": {
    embedtitle: (category) => `SyrCityLine ${category} 请求`,
    embedauthor: (interaction, requestedData) =>
      `${interaction.user.tag} | 请求关注者 - ${requestedData.Rating}`,
    embeddescription: (requestedData) =>
      `描述: ***${
        requestedData.Description ? requestedData.Description : "未提供描述"
      }***`,
    embedsummary: (requestedData) => ({
      name: "> 概要",
      value: requestedData.Summary ? requestedData.Summary : "未提供摘要",
    }),
  },
  fr: {
    embedtitle: (category) => `SyrCityLine ${category} Demande`,
    embedauthor: (interaction, requestedData) =>
      `${interaction.user.tag} | Suiveurs de demande - ${requestedData.Rating}`,
    embeddescription: (requestedData) =>
      `Description: ***${
        requestedData.Description
          ? requestedData.Description
          : "Aucune description fournie"
      }***`,
    embedsummary: (requestedData) => ({
      name: "> Résumé",
      value: requestedData.Summary
        ? requestedData.Summary
        : "Aucun résumé fourni",
    }),
  },
  uk: {
    embedtitle: (category) => `SyrCityLine ${category} Запит`,
    embedauthor: (interaction, requestedData) =>
      `${interaction.user.tag} | Запит послідовників - ${requestedData.Rating}`,
    embeddescription: (requestedData) =>
      `Опис: ***${
        requestedData.Description ? requestedData.Description : "Опис не надано"
      }***`,
    embedsummary: (requestedData) => ({
      name: "> Резюме",
      value: requestedData.Summary ? requestedData.Summary : "Резюме не надано",
    }),
  },
  it: {
    embedtitle: (category) => `SyrCityLine ${category} Richiesta`,
    embedauthor: (interaction, requestedData) =>
      `${interaction.user.tag} | Richiesta Follower - ${requestedData.Rating}`,
    embeddescription: (requestedData) =>
      `Descrizione: ***${
        requestedData.Description
          ? requestedData.Description
          : "Nessuna descrizione fornita"
      }***`,
    embedsummary: (requestedData) => ({
      name: "> Riepilogo",
      value: requestedData.Summary
        ? requestedData.Summary
        : "Nessun riepilogo fornito",
    }),
  },
  vi: {
    embedtitle: (category) => `SyrCityLine ${category} Yêu cầu`,
    embedauthor: (interaction, requestedData) =>
      `${interaction.user.tag} | Yêu cầu Theo dõi - ${requestedData.Rating}`,
    embeddescription: (requestedData) =>
      `Mô tả: ***${
        requestedData.Description ? requestedData.Description : "Không có mô tả"
      }***`,
    embedsummary: (requestedData) => ({
      name: "> Tóm tắt",
      value: requestedData.Summary ? requestedData.Summary : "Không có tóm tắt",
    }),
  },
  de: {
    embedtitle: (category) => `SyrCityLine ${category} Anfrage`,
    embedauthor: (interaction, requestedData) =>
      `${interaction.user.tag} | Anfrage Follower - ${requestedData.Rating}`,
    embeddescription: (requestedData) =>
      `Beschreibung: ***${
        requestedData.Description
          ? requestedData.Description
          : "Keine Beschreibung bereitgestellt"
      }***`,
    embedsummary: (requestedData) => ({
      name: "> Zusammenfassung",
      value: requestedData.Summary
        ? requestedData.Summary
        : "Keine Zusammenfassung bereitgestellt",
    }),
  },
};

module.exports = locales.requestlocalizations = locales;
