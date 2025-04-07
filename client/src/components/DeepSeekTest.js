import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';

// Configure axios to use the correct base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || window.location.origin
});

const DeepSeekTest = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      const response = await api.post('/api/test-deepseek', { 
        apiKey: apiKey || process.env.REACT_APP_DEEPSEEK_API_KEY 
      });
      setTestResult(response.data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.error || 'An error occurred during the test');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          DeepSeek API Test
        </Typography>
        
        <TextField
          fullWidth
          label="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          margin="normal"
          type="password"
          placeholder="Enter your DeepSeek API key (optional if set in environment)"
        />

        <Button
          variant="contained"
          onClick={handleTest}
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : 'Run Test'}
        </Button>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {testResult && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Test Results
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DeepSeekTest; 