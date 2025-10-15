const express = require("express");
const router = express.Router();

const { healthCheck } = require("../controllers/healthController");
const { ping } = require("../controllers/pingController");
const { getResponses, clearResponses } = require("../controllers/responseController");
const validateToken = require("../middlewares/validateToken");

router.get("/health", healthCheck);
router.get("/ping", ping);
router.get("/get-responses", validateToken, getResponses);
router.delete("/clear-responses", clearResponses);

module.exports = router;
