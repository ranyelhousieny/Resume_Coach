import React from 'react';
import { Box, Typography } from '@mui/material';

export const CoachingAdvice = ({ advice }) => {
  if (!advice) return null;

  return (
    <Box>
      <Typography variant='h6'>
        Coaching Advice:
      </Typography>
      <Typography
        variant='body1'
        style={{ whiteSpace: 'pre-line' }}
      >
        {advice}
      </Typography>
    </Box>
  );
};