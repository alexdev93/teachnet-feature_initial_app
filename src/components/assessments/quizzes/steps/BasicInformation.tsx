import React from 'react';
import { Box, InputAdornment, Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import AdvancedDropdown from 'src/components/common/AdvancedDropdown';
import TextField from 'src/components/common/TextField';
import { QuizFormValues } from 'src/types/assessments/quizzes';

const BasicInformation: React.FC = () => {
  const { values, handleChange, errors, touched } = useFormikContext<QuizFormValues>();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name='title'
            label='Quiz Title'
            value={values.title}
            onChange={handleChange}
            error={touched.title && Boolean(errors.title)}
            helperText={touched.title ? errors.title : 'The title of the quiz.'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='timeLimit'
            label='Time Limit (minutes)'
            type='number'
            value={values.timeLimit}
            onChange={handleChange}
            error={touched.timeLimit && Boolean(errors.timeLimit)}
            helperText={
              touched.timeLimit ? errors.timeLimit : 'The time limit for the quiz in minutes.'
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name='successPercentage'
            label='Success Percentage'
            type='number'
            value={values.successPercentage}
            onChange={handleChange}
            error={touched.successPercentage && Boolean(errors.successPercentage)}
            helperText={
              touched.successPercentage
                ? errors.successPercentage
                : 'Minimum percentage required to pass the quiz'
            }
            InputProps={{
              endAdornment: <InputAdornment position='end'>%</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name='description'
            label='Description'
            value={values.description}
            onChange={handleChange}
            error={touched.description && Boolean(errors.description)}
            helperText={touched.description && errors.description}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <AdvancedDropdown
            defaultOptions={[]}
            id='tags'
            label='Tags'
            // value={{
            //   label: values.subject,
            //   value: values.subject,
            // }}
            onChange={handleChange}
            error={touched.tags && Boolean(errors.tags)}
            helperText={touched.tags ? (errors.tags as string) : ''}
            withChips
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicInformation;
