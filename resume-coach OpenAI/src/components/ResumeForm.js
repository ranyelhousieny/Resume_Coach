import React from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Link
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

      <Alert severity="info" sx={{ mb: 2 }}>
        For best results, include only the most relevant sections of your resume and the key requirements from the job description. Very long inputs will be automatically truncated.
        <Box mt={1}>
          Download sample files: {' '}
          <Link href="/samples/sample-resume.txt" download>Resume</Link> | {' '}
          <Link href="/samples/sample-jd.txt" download>Job Description</Link>
        </Box>
      </Alert>

      <Box marginBottom='20px'>
        <Typography variant='h6'>
          Upload Your Resume:
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Tip: Focus on relevant experience and skills for this specific job.
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
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Tip: Include the most important requirements and responsibilities.
        </Typography>
        <TextField
          multiline
          rows={6}
          fullWidth
          variant='outlined'
          placeholder='Paste the key parts of the job description here...'
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