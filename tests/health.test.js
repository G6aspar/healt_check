// tests/health.test.js
const request = require('supertest');
const app = require('../app');
const redis = require('../config/redisClient');

const VALID_TOKEN = 'test-token-' + Date.now();

describe('Health Check Endpoints', () => {
  beforeAll(async () => {
    // Guardar token válido en Redis (sintaxis correcta para ioredis)
    await redis.setex(`token:${VALID_TOKEN}`, 60, 'active');
  });

  afterAll(async () => {
    // Limpiar y cerrar conexión
    await redis.del(`token:${VALID_TOKEN}`);
    await redis.quit(); // Crucial para que Jest termine
  });

  it('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.timestamp).toBeDefined();
  });

  it('GET /get-responses without token should return 401', async () => {
    const res = await request(app).get('/get-responses');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid or missing token');
  });

  it('GET /get-responses with invalid token should return 401', async () => {
    const res = await request(app)
      .get('/get-responses')
      .set('Authorization', 'Bearer fake-token-123');
    expect(res.statusCode).toBe(401);
  });

  it('GET /get-responses with valid token should return 200', async () => {
    const res = await request(app)
      .get('/get-responses')
      .set('Authorization', `Bearer ${VALID_TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('count');
    expect(Array.isArray(res.body.responses)).toBe(true);
  });

  it('DELETE /clear-responses with valid token should return 200', async () => {
    const res = await request(app)
      .delete('/clear-responses')
      .set('Authorization', `Bearer ${VALID_TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('All responses have been cleared successfully');
  });
});