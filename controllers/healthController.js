const redis = require("../config/redisClient");

exports.healthCheck = async (req, res) => {
  const info = {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    timestamp: new Date().toISOString(),
  };

  try {
    // Guardamos el request en Redis (lista)
    await redis.lpush("health_requests", JSON.stringify(info));

    res.status(200).json({
      status: "ok",
      message: "Servicio operativo",
      data: info,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "No se pudo guardar en Redis",
      error: error.message,
    });
  }
};

