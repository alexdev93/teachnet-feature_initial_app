import React from 'react';
import { Box, Typography, FormControlLabel, Switch } from '@mui/material';
import FileUpload from '../FileUpload';
import { useFormikContext } from 'formik';
import { QuizFormValues } from 'src/types/assessments/quizzes';

const AIGeneration: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<QuizFormValues>();

  const handleUseAIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('useAI', event.target.checked);
  };

  return (
    <Box>
      <Box display='flex' justifyContent='center'>
        <Box
          sx={{
            '& label': {
              display: 'flex',
              justifyContent: 'center',
            },
          }}
        >
          <Typography variant='h6'>Would you like AI to help you generate questions?</Typography>
          <FormControlLabel
            control={<Switch checked={values.useAI} onChange={handleUseAIChange} />}
            label={
              values.useAI
                ? 'Yes, use AI to generate questions'
                : 'No, I will create my own questions'
            }
          />
        </Box>
      </Box>
      {values.useAI && (
        <Box mt={2}>
          <Typography variant='h6'>Upload files for AI to use:</Typography>
          <FileUpload />
        </Box>
      )}
    </Box>
  );
};

export default AIGeneration;
