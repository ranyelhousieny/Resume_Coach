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
    selectedOption,
    setSelectedOption,
  ] = useState('openai'); // Default to OpenAI
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

  // Handle option selection
  const handleOptionChange = (
    event
  ) => {
    setSelectedOption(
      event.target.value
    );
  };

  // Submit the files and get coaching advice
  const handleSubmit =
    async () => {
      if (
        !resume ||
        !jobDescription
      ) {
        alert(
          'Please provide a resume and job description.'
        );
        return;
      }

      if (
        selectedOption ===
          'openai' &&
        !apiKey
      ) {
        alert(
          'Please provide your OpenAI API key.'
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

            // Prepare the request payload
            const prompt = `Resume: \n${resumeText}\n\nJob Description: \n${jobDescription}`;
            let response;

            if (
              selectedOption ===
              'openai'
            ) {
              // OpenAI API
              const requestBody =
                {
                  model:
                    'gpt-4',
                  messages: [
                    {
                      role: 'system',
                      content:
                        'You are a resume coach. Analyze the resume and job description provided and give actionable advice for improvement.',
                    },
                    {
                      role: 'user',
                      content:
                        prompt,
                    },
                  ],
                };

              response =
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
              setCoachingAdvice(
                response.data
                  .choices[0]
                  .message
                  .content
              );
            } else if (
              selectedOption ===
              'llama'
            ) {
              // Llama 3.2 1B Instruct API
              response =
                await axios.post(
                  'http://<your-ec2-public-ip>:8000/generate', // Replace with your EC2 public IP
                  { prompt },
                  {
                    headers: {
                      'Content-Type':
                        'application/json',
                    },
                  }
                );
              setCoachingAdvice(
                response.data
                  .response
              );
            }
          };

        // Read the resume file as text
        reader.readAsText(
          resume
        );
      } catch (error) {
        console.error(
          'Error:',
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
          Select Processing
          Option:
        </Typography>
        <FormControl
          fullWidth>
          <InputLabel id='option-select-label'>
            Option
          </InputLabel>
          <Select
            labelId='option-select-label'
            value={
              selectedOption
            }
            onChange={
              handleOptionChange
            }>
            <MenuItem value='openai'>
              OpenAI API
            </MenuItem>
            <MenuItem value='llama'>
              Llama 3.2 1B
              Instruct
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {selectedOption ===
        'openai' && (
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
      )}

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
