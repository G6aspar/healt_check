const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
});

redis.on("connect", () => {
  console.log("🟢 Conectado a Redis correctamente");
});

redis.on("error", (err) => {
  console.error("🔴 Error de conexión a Redis:", err);
});

module.exports = redis;
