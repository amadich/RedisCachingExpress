import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import { createClient } from 'redis';

const app = express();
const port = 3000;

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

await redisClient.connect();

app.get('/api/external', async (req, res) => {
  try {
    const cacheKey = 'httpbin:get';

    // Try to get cached data
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log('Serving from Redis cache');
      return res.json(JSON.parse(cachedData));
    }

    // If not cached, fetch from external API
    const response = await fetch('https://httpbin.org/get');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();

    // Store the response in Redis cache for 60 seconds (TTL)
    await redisClient.setEx(cacheKey, 60, JSON.stringify(data));

    console.log('Fetched from external API and cached');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch external API' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
