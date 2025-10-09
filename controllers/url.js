const URL = require("../models/url");
const { nanoid } = require("nanoid");

async function handleGenerateNewSortURL(req, res) {
  const body = req.body;
  if (!body) return res.status(400).json({ error: "URL required" });
  const sortId = nanoid(8);
  await URL.create({
    sortId: sortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: sortId });
}

async function handleGetAnalytics(req, res) {
  const sortId = req.params.sortId;
  const result = await URL.findOne({ sortId });

  if (!result) {
    return res.status(404).json({ error: "URL not found" });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handlePostNew(req, res) {
  const sortId = req.params.sortId;
  const entry = await URL.findOneAndUpdate(
    { sortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send("URL not found");
  }
}

module.exports = { handleGenerateNewSortURL, handleGetAnalytics,handlePostNew };
