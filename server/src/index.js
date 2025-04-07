require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { testDeepSeekConnection } = require('./services/deepseek');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example API endpoint
app.get('/api/data', async (req, res) => {
  try {
    res.json({ message: 'Server is working!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DeepSeek test endpoint
app.post('/api/test-deepseek', async (req, res) => {
  try {
    const apiKey = req.body.apiKey || process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    const result = await testDeepSeekConnection(apiKey);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 