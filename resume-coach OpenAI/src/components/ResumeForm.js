import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress
} from '@mui/material';

export const ResumeForm = ({
  apiKey,
  jobDescription,
  isLoading,
  onApiKeyChange,
  onResumeChange,
  onJobDescriptionChange,
  onSubmit
}) => {
  return (
    <>
      <Box marginBottom='20px'>
        <Typography variant='h6'>
          OpenAI API Key:
        </Typography>
        <TextField
          fullWidth
          type='password'
          placeholder='Enter your OpenAI API key'
          value={apiKey}
          onChange={onApiKeyChange}
        />
      </Box>

      <Box marginBottom='20px'>
        <Typography variant='h6'>
          Upload Your Resume:
        </Typography>
        <input
          type='file'
          accept='.pdf,.docx,.txt'
          onChange={onResumeChange}
          style={{ marginTop: '10px' }}
        />
      </Box>

      <Box marginBottom='20px'>
        <Typography variant='h6'>
          Paste Job Description:
        </Typography>
        <TextField
          multiline
          rows={6}
          fullWidth
          variant='outlined'
          placeholder='Paste the job description here...'
          value={jobDescription}
          onChange={onJobDescriptionChange}
        />
      </Box>

      <Button
        variant='contained'
        color='primary'
        onClick={onSubmit}
        fullWidth
        disabled={isLoading}
        style={{ marginBottom: '20px' }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Get Coaching Advice'
        )}
      </Button>
    </>
  );
};