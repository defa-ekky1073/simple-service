const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Create Redis client
const client = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379
});

client.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis
(async () => {
  await client.connect();
})();

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.post('/api/increment', async (req, res) => {
  try {
    const count = await client.incr('count');
    res.json({ count });
  } catch (error) {
    console.error('Error incrementing count:', error);
    res.status(500).json({ error: 'Failed to increment count' });
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});