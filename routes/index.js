const express = require("express");
const router = express.Router();
const { healthCheck } = require("../controllers/healthController");
const { ping } = require("../controllers/pingController");

router.get("/health", healthCheck);
router.get("/ping", ping);

module.exports = router;
