import React, {
  useState,
} from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

function App() {
  const [resume, setResume] =
    useState(null);
  const [
    jobDescription,
    setJobDescription,
  ] = useState('');
  const [apiKey, setApiKey] =
    useState('');
  const [
    selectedModel,
    setSelectedModel,
  ] = useState('gpt-4');
  const [
    coachingAdvice,
    setCoachingAdvice,
  ] = useState('');

  // Handle resume file selection
  const handleResumeChange = (
    event
  ) => {
    setResume(
      event.target.files[0]
    );
  };

  // Handle job description input
  const handleJobDescriptionChange =
    (event) => {
      setJobDescription(
        event.target.value
      );
    };

  // Handle API key input
  const handleApiKeyChange = (
    event
  ) => {
    setApiKey(
      event.target.value
    );
  };

  // Handle model selection
  const handleModelChange = (
    event
  ) => {
    setSelectedModel(
      event.target.value
    );
  };

  // Submit the files and get coaching advice
  const handleSubmit =
    async () => {
      if (
        !resume ||
        !jobDescription ||
        !apiKey
      ) {
        alert(
          'Please provide a resume, job description, and API key.'
        );
        return;
      }

      try {
        // Read the resume file
        const reader =
          new FileReader();
        reader.onload =
          async () => {
            const resumeText =
              reader.result;

            // Format the request payload
            const requestBody =
              {
                model:
                  selectedModel,
                messages: [
                  {
                    role: 'system',
                    content:
                      'You are a resume coach. Analyze the resume and job description provided and give actionable advice for improvement.',
                  },
                  {
                    role: 'user',
                    content: `Resume: \n${resumeText}\n\nJob Description: \n${jobDescription}`,
                  },
                ],
              };

            // Call the OpenAI API
            const response =
              await axios.post(
                'https://api.openai.com/v1/chat/completions',
                requestBody,
                {
                  headers: {
                    'Content-Type':
                      'application/json',
                    Authorization: `Bearer ${apiKey}`,
                  },
                }
              );

            // Update the UI with coaching advice
            setCoachingAdvice(
              response.data
                .choices[0]
                .message
                .content
            );
          };

        // Read the resume file as text
        reader.readAsText(
          resume
        );
      } catch (error) {
        console.error(
          'Error contacting OpenAI API:',
          error
        );
        setCoachingAdvice(
          'Error fetching coaching advice. Please try again.'
        );
      }
    };

  return (
    <Container
      maxWidth='sm'
      style={{
        marginTop: '20px',
      }}>
      <Typography
        variant='h4'
        align='center'
        gutterBottom>
        Resume Coach
      </Typography>

      <Box marginBottom='20px'>
        <Typography variant='h6'>
          OpenAI API Key:
        </Typography>
        <TextField
          fullWidth
          type='password'
          placeholder='Enter your OpenAI API key'
          value={apiKey}
          onChange={
            handleApiKeyChange
          }
        />
      </Box>

      <Box marginBottom='20px'>
        <Typography variant='h6'>
          Select LLM Model:
        </Typography>
        <FormControl
          fullWidth>
          <InputLabel id='model-select-label'>
            Model
          </InputLabel>
          <Select
            labelId='model-select-label'
            value={
              selectedModel
            }
            onChange={
              handleModelChange
            }>
            <MenuItem value='gpt-4o-mini'>
              GPT-4o-mini
            </MenuItem>
            <MenuItem value='gpt-4o'>
              GPT-4o
            </MenuItem>
            <MenuItem value='gpt-4'>
              GPT-4
            </MenuItem>
            <MenuItem value='gpt-3.5-turbo'>
              GPT-3.5 Turbo
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box marginBottom='20px'>
        <Typography variant='h6'>
          Upload Your Resume:
        </Typography>
        <input
          type='file'
          accept='.pdf,.docx,.txt'
          onChange={
            handleResumeChange
          }
          style={{
            marginTop: '10px',
          }}
        />
      </Box>

      <Box marginBottom='20px'>
        <Typography variant='h6'>
          Paste Job
          Description:
        </Typography>
        <TextField
          multiline
          rows={6}
          fullWidth
          variant='outlined'
          placeholder='Paste the job description here...'
          value={
            jobDescription
          }
          onChange={
            handleJobDescriptionChange
          }
        />
      </Box>

      <Button
        variant='contained'
        color='primary'
        onClick={handleSubmit}
        fullWidth
        style={{
          marginBottom:
            '20px',
        }}>
        Get Coaching Advice
      </Button>

      {coachingAdvice && (
        <Box>
          <Typography variant='h6'>
            Coaching Advice:
          </Typography>
          <Typography
            variant='body1'
            style={{
              whiteSpace:
                'pre-line',
            }}>
            {coachingAdvice}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default App;
