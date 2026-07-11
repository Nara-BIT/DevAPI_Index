const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Category = require("../models/Category");
const Api = require("../models/Api");

dotenv.config();

const categories = [
  { name: "Weather", slug: "weather", description: "Weather data and forecasts" },
  { name: "Finance", slug: "finance", description: "Financial data, stocks, crypto" },
  { name: "News", slug: "news", description: "News aggregation and articles" },
  { name: "Entertainment", slug: "entertainment", description: "Movies, music, games" },
  { name: "Sports", slug: "sports", description: "Sports data and statistics" },
  { name: "Health", slug: "health", description: "Health and medical data" },
  { name: "Education", slug: "education", description: "Educational resources" },
  { name: "Social", slug: "social", description: "Social media and networking" },
  { name: "Utilities", slug: "utilities", description: "General purpose utility APIs" },
  { name: "AI & ML", slug: "ai-ml", description: "Artificial intelligence and machine learning" },
];

const apis = [
  {
    name: "OpenWeatherMap",
    description: "Current weather data, forecasts, and historical weather data for any location.",
    url: "https://api.openweathermap.org/data/2.5",
    authType: "api-key",
    cors: true,
    https: true,
    docUrl: "https://openweathermap.org/api",
    categorySlug: "weather",
  },
  {
    name: "REST Countries",
    description: "Information about countries from various sources, including REST API.",
    url: "https://restcountries.com/v3.1",
    authType: "none",
    cors: true,
    https: true,
    docUrl: "https://restcountries.com/",
    categorySlug: "utilities",
  },
  {
    name: "JSONPlaceholder",
    description: "Free fake API for testing and prototyping with posts, comments, users, etc.",
    url: "https://jsonplaceholder.typicode.com",
    authType: "none",
    cors: true,
    https: true,
    docUrl: "https://jsonplaceholder.typicode.com/",
    categorySlug: "utilities",
  },
  {
    name: "PokeAPI",
    description: "All the Pokémon data you'll ever need in one place, very easily accessible.",
    url: "https://pokeapi.co/api/v2",
    authType: "none",
    cors: true,
    https: true,
    docUrl: "https://pokeapi.co/docs/v2",
    categorySlug: "entertainment",
  },
  {
    name: "NewsAPI",
    description: "Search worldwide news articles, breaking news coverage, and top headlines.",
    url: "https://newsapi.org/v2",
    authType: "api-key",
    cors: false,
    https: true,
    docUrl: "https://newsapi.org/docs",
    categorySlug: "news",
  },
  {
    name: "Alpha Vantage",
    description: "Realtime and historical stock, forex, and cryptocurrency data.",
    url: "https://www.alphavantage.co/query",
    authType: "api-key",
    cors: true,
    https: true,
    docUrl: "https://www.alphavantage.co/documentation/",
    categorySlug: "finance",
  },
  {
    name: "OpenAI API",
    description: "Access GPT models, DALL-E, and Whisper for AI-powered applications.",
    url: "https://api.openai.com/v1",
    authType: "bearer",
    cors: true,
    https: true,
    docUrl: "https://platform.openai.com/docs",
    categorySlug: "ai-ml",
  },
  {
    name: "Spoonacular",
    description: "Recipes, food products, and menu planning data.",
    url: "https://api.spoonacular.com",
    authType: "api-key",
    cors: true,
    https: true,
    docUrl: "https://spoonacular.com/food-api/docs",
    categorySlug: "health",
  },
  {
    name: "ESPN API",
    description: "Sports scores, standings, and news from ESPN.",
    url: "https://site.api.espn.com/apis",
    authType: "none",
    cors: true,
    https: true,
    docUrl: "https://www.espn.com/apis",
    categorySlug: "sports",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Category.deleteMany({});
    await Api.deleteMany({});

    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories seeded`);

    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    const apisToInsert = apis.map((api) => ({
      name: api.name,
      description: api.description,
      url: api.url,
      category: categoryMap[api.categorySlug],
      authType: api.authType,
      cors: api.cors,
      https: api.https,
      docUrl: api.docUrl,
      status: "approved",
    }));

    const createdApis = await Api.insertMany(apisToInsert);
    console.log(`${createdApis.length} APIs seeded`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
