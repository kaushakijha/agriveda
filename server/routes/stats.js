const express = require("express");
const router = express.Router();
const { getPlatformStatistics } = require("../services/statisticsService");

// Get platform statistics
router.get("/", async (req, res) => {
  try {
    const statistics = await getPlatformStatistics();
    res.json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

module.exports = router;
