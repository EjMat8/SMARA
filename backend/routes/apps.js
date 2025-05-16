import express from "express";
import {
  fetchAppDetailsByKeyword,
  searchThroughCategory,
  getDataSafety,
} from "../services/scraper.js";
import catchAsync from "../utils/catchAsync.js";
import { generateAISummary } from "../services/generateInsight.js";
const router = express.Router();

router.get(
  "/search",
  catchAsync(async (req, res, next) => {
    const {
      keyword = "",
      rating = "",
      numInstall = "",
      category = "",
      collection = "",
      limit = 10,
    } = req.query;
    console.log("keyword: ", keyword);
    console.log("category: ", category);
    console.log("limit: ", limit);
    console.log("rating: ", rating);
    console.log("numInstall: ", numInstall);
    console.log("collection: ", collection);
    if (!keyword && !category)
      return res
        .status(400)
        .json({ error: "Input at least a keyword or category" });
    let data;
    if (category && !keyword) {
      data = await searchThroughCategory(
        category,
        collection,
        Number(numInstall),
        Number(rating),
        Number(limit)
      );
    } else if (keyword && !category) {
      data = await fetchAppDetailsByKeyword(
        keyword,
        Number(limit),
        Number(rating),
        Number(numInstall)
      );
    }
    res.json(data);
  })
);

router.post(
  "/insights",
  catchAsync(async (req, res, next) => {
    const { app } = req.body;
    if (!app) {
      return res.status(400).json({ error: "App required" });
    }

    const summary = await generateAISummary(app);

    res.json({ summary });
  })
);

router.post(
  "/datasafety",
  catchAsync(async (req, res, next) => {
    const { appIds } = req.body;

    if (!appIds || !Array.isArray(appIds)) {
      return res.status(400).json({ error: "appIds array is required" });
    }

    const dataSafetyResults = await getDataSafety(appIds);

    res.json({ dataSafety: dataSafetyResults });
  })
);

export default router;
