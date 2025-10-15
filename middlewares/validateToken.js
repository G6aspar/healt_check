const redisClient = require("../config/redisClient");

const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid or missing token" });
    }

    const token = authHeader.split(" ")[1];

    const exists = await redisClient.exists(`token:${token}`);
    if (!exists) {
      return res.status(401).json({ message: "Invalid or missing token" });
    }

    // Token válido
    next();
  } catch (error) {
    console.error("Error validando token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validateToken;