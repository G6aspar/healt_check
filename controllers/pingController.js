// controllers/pingController.js
const redis = require("../config/redisClient");

exports.ping = async (req, res) => {
  try {
    const pong = await redis.ping();
    res.status(200).json({
      status: "ok",
      message: `Redis respondió: ${pong}`,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Redis no responde",
      error: error.message,
    });
  }
};
