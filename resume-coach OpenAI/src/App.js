import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { ResumeForm } from './components/ResumeForm';
import { CoachingAdvice } from './components/CoachingAdvice';
import { useFileReader } from './hooks/useFileReader';
import { analyzeResume } from './services/langchainService';

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [coachingAdvice, setCoachingAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { readFile } = useFileReader();

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleSubmit = async () => {
    if (!resume || !jobDescription) {
      alert('Please provide a resume and job description.');
      return;
    }

    if (!apiKey) {
      alert('Please provide your OpenAI API key.');
      return;
    }

    setIsLoading(true);
    try {
      const resumeText = await readFile(resume);
      const advice = await analyzeResume(resumeText, jobDescription, apiKey);
      setCoachingAdvice(advice);
    } catch (error) {
      console.error('Error:', error);
      setCoachingAdvice('Error fetching coaching advice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth='sm' style={{ marginTop: '20px' }}>
      <Typography variant='h4' align='center' gutterBottom>
        Resume Coach
      </Typography>

      <ResumeForm
        apiKey={apiKey}
        jobDescription={jobDescription}
        isLoading={isLoading}
        onApiKeyChange={handleApiKeyChange}
        onResumeChange={handleResumeChange}
        onJobDescriptionChange={handleJobDescriptionChange}
        onSubmit={handleSubmit}
      />

      <CoachingAdvice advice={coachingAdvice} />
    </Container>
  );
}

export default App;
