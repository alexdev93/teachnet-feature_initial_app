import React from 'react';
import { Box, Typography, LinearProgress, styled } from '@mui/material';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[300],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
}));

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant='body2' color='text.secondary'>
          {currentStep}/{totalSteps}
        </Typography>
        {/* <Typography variant='body2' color='text.secondary'>
          {Math.round(progress)}%
        </Typography> */}
      </Box>
      <StyledLinearProgress variant='determinate' value={progress} />
    </Box>
  );
};

export default Stepper;
