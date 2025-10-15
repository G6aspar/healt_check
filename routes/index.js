const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/healthController");
const { ping } = require("../controllers/pingController");
const { getResponses } = require("../controllers/responseController");

router.get("/health", healthCheck);
router.get("/ping", ping);
router.get("/get-responses", getResponses);

module.exports = router;
