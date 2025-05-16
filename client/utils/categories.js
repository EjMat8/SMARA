import { createListCollection } from "@chakra-ui/react";
const categoriesList = createListCollection({
  items: [
    { label: "APPLICATION", value: "APPLICATION" },
    { label: "ANDROID WEAR", value: "ANDROID_WEAR" },
    { label: "ART AND DESIGN", value: "ART_AND_DESIGN" },
    { label: "AUTO AND VEHICLES", value: "AUTO_AND_VEHICLES" },
    { label: "BEAUTY", value: "BEAUTY" },
    { label: "BOOKS AND REFERENCE", value: "BOOKS_AND_REFERENCE" },
    { label: "BUSINESS", value: "BUSINESS" },
    { label: "COMICS", value: "COMICS" },
    { label: "COMMUNICATION", value: "COMMUNICATION" },
    { label: "DATING", value: "DATING" },
    { label: "EDUCATION", value: "EDUCATION" },
    { label: "ENTERTAINMENT", value: "ENTERTAINMENT" },
    { label: "EVENTS", value: "EVENTS" },
    { label: "FINANCE", value: "FINANCE" },
    { label: "FOOD AND DRINK", value: "FOOD_AND_DRINK" },
    { label: "HEALTH AND FITNESS", value: "HEALTH_AND_FITNESS" },
    { label: "HOUSE AND HOME", value: "HOUSE_AND_HOME" },
    { label: "LIBRARIES AND DEMO", value: "LIBRARIES_AND_DEMO" },
    { label: "LIFESTYLE", value: "LIFESTYLE" },
    { label: "MAPS AND NAVIGATION", value: "MAPS_AND_NAVIGATION" },
    { label: "MEDICAL", value: "MEDICAL" },
    { label: "MUSIC AND AUDIO", value: "MUSIC_AND_AUDIO" },
    { label: "NEWS AND MAGAZINES", value: "NEWS_AND_MAGAZINES" },
    { label: "PARENTING", value: "PARENTING" },
    { label: "PERSONALIZATION", value: "PERSONALIZATION" },
    { label: "PHOTOGRAPHY", value: "PHOTOGRAPHY" },
    { label: "PRODUCTIVITY", value: "PRODUCTIVITY" },
    { label: "SHOPPING", value: "SHOPPING" },
    { label: "SOCIAL", value: "SOCIAL" },
    { label: "SPORTS", value: "SPORTS" },
    { label: "TOOLS", value: "TOOLS" },
    { label: "TRAVEL AND LOCAL", value: "TRAVEL_AND_LOCAL" },
    { label: "VIDEO PLAYERS", value: "VIDEO_PLAYERS" },
    { label: "WATCH FACE", value: "WATCH_FACE" },
    { label: "WEATHER", value: "WEATHER" },
    { label: "GAME", value: "GAME" },
    { label: "GAME ACTION", value: "GAME_ACTION" },
    { label: "GAME ADVENTURE", value: "GAME_ADVENTURE" },
    { label: "GAME ARCADE", value: "GAME_ARCADE" },
    { label: "GAME BOARD", value: "GAME_BOARD" },
    { label: "GAME CARD", value: "GAME_CARD" },
    { label: "GAME CASINO", value: "GAME_CASINO" },
    { label: "GAME CASUAL", value: "GAME_CASUAL" },
    { label: "GAME EDUCATIONAL", value: "GAME_EDUCATIONAL" },
    { label: "GAME MUSIC", value: "GAME_MUSIC" },
    { label: "GAME PUZZLE", value: "GAME_PUZZLE" },
    { label: "GAME RACING", value: "GAME_RACING" },
    { label: "GAME ROLE PLAYING", value: "GAME_ROLE_PLAYING" },
    { label: "GAME SIMULATION", value: "GAME_SIMULATION" },
    { label: "GAME SPORTS", value: "GAME_SPORTS" },
    { label: "GAME STRATEGY", value: "GAME_STRATEGY" },
    { label: "GAME TRIVIA", value: "GAME_TRIVIA" },
    { label: "GAME WORD", value: "GAME_WORD" },
    { label: "FAMILY", value: "FAMILY" },
  ],
});

export const installs = createListCollection({
  items: [
    { label: "1M+", value: 1000000 },
    { label: "100,000+", value: 100000 },
    { label: "10,000+", value: 10000 },
  ],
});

export const collection = createListCollection({
  items: [
    { label: "Top Free", value: "TOP_FREE" },
    { label: "Top Paid", value: "TOP_PAID" },
    { label: "Grossing", value: "GROSSING" },
  ],
});
export const format = createListCollection({
  items: [
    { label: "JSON", value: "json" },
    { label: "CSV", value: "csv" },
  ],
});
export const ratings = createListCollection({
  items: [
    { label: "4+ stars", value: 4.0 },
    { label: "3+ stars", value: 3.0 },
    { label: "2+ stars", value: 2.0 },
  ],
});
export const prices = createListCollection({
  items: [
    { label: "Free", value: true },
    { label: "Paid", value: false },
  ],
});

export const limiters = createListCollection({
  items: [
    { label: " <= 10", value: 10 },
    { label: "<= 50", value: 50 },
    { label: "<= 100", value: 100 },
    { label: "<= 250", value: 250 },
  ],
});

export const dataFields = createListCollection({
  items: [
    { label: " App Name", value: "title" },
    { label: "Developer", value: "developer" },
    { label: "Category", value: "categories" },
    { label: "Number of Ratings", value: "ratings" },
    { label: "Rating", value: "scoreText" },
    { label: "Installs", value: "maxInstalls" },
    { label: "Permissions", value: "permissions" },
    { label: "Price", value: "priceText" },
  ],
});

export default categoriesList;
