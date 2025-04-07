import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

const api = axios.create({
  baseURL: window.location.origin
});

const DeepSeekTest = () => {
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.post('/api/test-deepseek', { apiKey });
      setResponse(result.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        DeepSeek API Test
      </Typography>
      
      <TextField
        fullWidth
        label="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        margin="normal"
        placeholder="Enter your DeepSeek API key"
      />

      <Button
        variant="contained"
        onClick={handleTest}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      )}

      {response && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Typography variant="h6">Response:</Typography>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};

export default DeepSeekTest; 