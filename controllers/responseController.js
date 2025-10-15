// controllers/responseController.js
const redis = require("../config/redisClient");

exports.getResponses = async (req, res) => {
  try {
    // Obtenemos todos los registros de la lista
    const data = await redis.lrange("health_requests", 0, 9);

    // Parseamos cada JSON almacenado
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
