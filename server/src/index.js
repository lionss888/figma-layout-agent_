require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { testDeepSeekConnection } = require('./services/deepseek');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
    const response = await axios.post('https://api.deepseek.com/v1/chat/completions', {
      model: "deepseek-chat",
      messages: [{ role: "user", content: "Hello" }]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 