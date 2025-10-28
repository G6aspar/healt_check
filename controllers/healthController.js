// controllers/healthController.js
const redis = require("../config/redisClient");

exports.healthCheck = async (req, res) => {
  const timestamp = new Date().toISOString();

  try {
    // Guardamos datos completos en Redis (solo para auditoría interna)
    const logEntry = {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      timestamp,
    };
    await redis.lpush("health_requests", JSON.stringify(logEntry));

    // Respuesta pública: solo lo esencial (cumple con el requerimiento)
    res.status(200).json({
      status: "ok",
      timestamp,
    });
  } catch (error) {
    console.error("Error en /health:", error);
    res.status(500).json({
      status: "error",
      message: "No se pudo procesar el health check",
    });
  }
};
