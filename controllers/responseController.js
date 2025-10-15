// controllers/responseController.js
const redis = require("../config/redisClient");

// Devuelve todos los registros guardados
exports.getResponses = async (req, res) => {
  try {
    const data = await redis.lrange("health_requests", 0, -1);
    const parsedData = data.map((item) => JSON.parse(item));

    res.status(200).json({
      count: parsedData.length,
      responses: parsedData,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No se pudieron obtener los registros",
      error: error.message,
    });
  }
};

// 🔥 Nuevo endpoint: eliminar todos los registros
exports.clearResponses = async (req, res) => {
  try {
    await redis.del("health_requests");

    res.status(200).json({
      message: "All responses have been cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to clear responses",
      error: error.message,
    });
  }
};
