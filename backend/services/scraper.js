import gplay from "google-play-scraper";
import pThrottle from "p-throttle";

const mem = gplay.memoized();
const throttle = pThrottle({
  limit: 10,
  interval: 750,
});

const fetchPermissions = throttle(async (appId) => {
  return await mem.permissions({ appId });
});

const fetchDataSafety = throttle(async (appId) => {
  return await mem.datasafety({ appId });
});

const fetchApps = async ({
  type,
  term,
  category,
  collection,
  limit,
  rating,
  numInstall,
}) => {
  console.log(category, limit);

  const apps =
    type === "search"
      ? await mem.search({
          term,
          num: limit,
          fullDetail: true,
          throttle: 15,
        })
      : await mem.list({
          category,
          collection,
          num: limit,
          fullDetail: true,
          throttle: 15,
        });

  // Filter apps based on rating and installs BEFORE fetching permissions
  const filteredApps = apps.filter((app) => {
    const matchesRating = rating ? app.score >= rating : true;
    const matchesInstalls = numInstall ? app.maxInstalls >= numInstall : true;

    return matchesRating && matchesInstalls;
  });

  console.log(`Filtered apps count: ${filteredApps.length}`);

  // Fetch permissions only for the filtered apps
  const detailedApps = await Promise.all(
    filteredApps.map(async (details) => {
      const permissions = await fetchPermissions(details.appId).catch((err) => {
        console.error("Error fetching permissions for: ", details.appId, err);
        return [];
      });

      return {
        IAPRange: details.IAPRange,
        offersIAP: details.offersIAP,
        title: details.title,
        developer: details.developer,
        score: details.score,
        scoreText: details.scoreText,
        installs: details.installs,
        ratings: details.ratings,
        free: details.free,
        price: details.price,
        maxInstalls: details.maxInstalls,
        minInstalls: details.minInstalls,
        priceText: details.priceText,
        contentRating: details.contentRating,
        categories: details.categories,
        appId: details.appId,
        icon: details.icon,
        version: details.version,
        description: details.description,
        updated: details.updated,
        version: details.androidVersion,
        released: details.released,
        screenshots: details.screenshots,
        permissions,
      };
    })
  );

  console.log(detailedApps.length);
  return detailedApps;
};

const searchThroughCategory = async (
  category,
  collection,
  numInstall,
  rating,
  limit
) => {
  return fetchApps({
    type: "category",
    category,
    collection,
    limit,
    rating,
    numInstall,
  });
};

const fetchAppDetailsByKeyword = async (
  keyword,
  limit = 10,
  rating,
  numInstall
) => {
  return fetchApps({
    type: "search",
    term: keyword,
    limit,
    rating,
    numInstall,
  });
};

const getDataSafety = async (appIds) => {
  const dataSafetyResults = await Promise.all(
    appIds.map(async (appId) => {
      try {
        const dataSafety = await fetchDataSafety(appId);
        return { appId, dataSafety };
      } catch (err) {
        console.error(`Error fetching data safety for appId: ${appId}`, err);
        return { appId, dataSafety: null }; // Return null for failed requests
      }
    })
  );

  return dataSafetyResults;
};

export { fetchAppDetailsByKeyword, searchThroughCategory, getDataSafety };
