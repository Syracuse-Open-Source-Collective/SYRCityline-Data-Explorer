const {
  getDatabaseUpdatedTime,
} = require("../functions/getDatabaseUpdatedTime");

// Locale for database time
const locales = {
  "en-US": {
    databaseupdated: `Database last updated time: ${getDatabaseUpdatedTime()}`,
  },
  "es-ES": {
    databaseupdated: `Hora de la última actualización de la base de datos: ${getDatabaseUpdatedTime()}`,
  },
  "zh-CN": {
    databaseupdated: `数据库上次更新时间：${getDatabaseUpdatedTime()}`,
  },
  fr: {
    databaseupdated: `Heure de la dernière mise à jour de la base de données : ${getDatabaseUpdatedTime()}`,
  },
  uk: {
    databaseupdated: `Час останнього оновлення бази даних: ${getDatabaseUpdatedTime()}`,
  },
  it: {
    databaseupdated: `Ora dell'ultimo aggiornamento del database: ${getDatabaseUpdatedTime()}`,
  },
  vi: {
    databaseupdated: `Thời gian cập nhật cơ sở dữ liệu lần cuối: ${getDatabaseUpdatedTime()}`,
  },
  de: {
    databaseupdated: `Datenbank zuletzt aktualisiert: ${getDatabaseUpdatedTime()}`,
  },
};

module.exports = locales.databaselocalizations = locales;
