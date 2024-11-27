import React, {
  useState,
} from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
} from '@mui/material';
import axios from 'axios';

function App() {
  const [resume, setResume] =
    useState(null);
  const [
    jobDescription,
    setJobDescription,
  ] = useState('');
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

  // Submit the files and get coaching advice
  const handleSubmit =
    async () => {
      if (
        !resume ||
        !jobDescription
      ) {
        alert(
          'Please upload a resume and provide a job description.'
        );
        return;
      }

      try {
        // Step 1: Read the resume file
        const reader =
          new FileReader();
        reader.onload =
          async () => {
            const resumeText =
              reader.result;

            // Step 2: Format the request payload
            const requestBody =
              {
                model:
                  'gpt-4', // Choose the desired OpenAI model
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

            // Step 3: Call the OpenAI API
            const response =
              await axios.post(
                'https://api.openai.com/v1/chat/completions', // OpenAI Chat Completion endpoint
                requestBody,
                {
                  headers: {
                    'Content-Type':
                      'application/json',
                    Authorization: `Bearer YOUR_OPENAI_API_KEY`, // Replace with your OpenAI API key
                  },
                }
              );

            // Step 4: Update the UI with coaching advice
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
          Upload Your Resume:
        </Typography>
        <input
          type='file'
          accept='.pdf,.docx'
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
