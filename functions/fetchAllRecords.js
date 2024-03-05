function fetchAllRecords() {
  return new Promise(async (resolve, reject) => {
    const batchSize = 999;
    let offset = 0;
    let allRecords = [];

    try {
      while (true) {
        const response = await fetch(
          `https://services6.arcgis.com/bdPqSfflsdgFRVVM/arcgis/rest/services/SeeClickFix_Requests_2021_Present_AutoUpdate_Test/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&resultOffset=${offset}&resultRecordCount=${batchSize}&f=json`
        );
        const data = await response.json();

        allRecords = allRecords.concat(data.features);

        if (data.features.length < batchSize) {
          resolve(allRecords);
          break;
        }

        offset += batchSize;
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  fetchAllRecords,
};
