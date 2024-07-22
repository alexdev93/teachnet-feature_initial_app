import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Checkbox,
  Radio,
  RadioGroup,
  FormGroup,
  Chip,
  InputAdornment,
  Collapse,
  Grid,
  FormHelperText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useFormikContext } from 'formik';
import { useTranslation } from 'next-i18next';
import { QuizFormValues } from 'src/types/assessments/quizzes';
// import QuestionType from 'pages/assessments/new/quiz/steps/QuestionType';

const QuizSettings: React.FC = () => {
  const { t } = useTranslation();

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [newFocusArea, setNewFocusArea] = useState('');
  const { values, handleChange, setFieldValue } = useFormikContext<QuizFormValues>();

  const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFieldValue(`AISettings.questionTypes.${name}`, checked);
  };

  const handleAddFocusArea = () => {
    if (newFocusArea.trim()) {
      setFieldValue('AISettings.focusAreas', [
        ...values.AISettings.focusAreas,
        newFocusArea.trim(),
      ]);
      setNewFocusArea('');
    }
  };

  const handleRemoveFocusArea = (areaToRemove: string) => {
    setFieldValue(
      'AISettings.focusAreas',
      values.AISettings.focusAreas.filter(area => area !== areaToRemove),
    );
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>{t('assessments:AI.numberOfQuestions')}</Typography>
          <TextField
            fullWidth
            name='numQuestions'
            // label='Number of Questions'
            type='number'
            value={values.AISettings.numQuestions}
            onChange={e => setFieldValue('AISettings.numQuestions', parseInt(e.target.value))}
            // helperText=''
          />
          <FormHelperText>{t('assessments:AI.numberOfQuestionsHelperText')}</FormHelperText>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1'>{t('assessments:AI.difficulty')}</Typography>
          <RadioGroup
            name='difficulty'
            value={values.AISettings.difficulty}
            onChange={e => setFieldValue('AISettings.difficulty', e.target.value)}
          >
            <FormControlLabel value='easy' control={<Radio />} label='Easy' />
            <FormControlLabel value='medium' control={<Radio />} label='Medium' />
            <FormControlLabel value='hard' control={<Radio />} label='Hard' />
            <FormHelperText>{t('assessments:AI.difficultyHelperText')}</FormHelperText>
          </RadioGroup>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant='outlined'
            onClick={() => setShowAdvanced(!showAdvanced)}
            endIcon={!showAdvanced ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          >
            {showAdvanced
              ? t('assessments:AI.hideAdvancedSettings')
              : t('assessments:AI.showAdvancedSettings')}
          </Button>
        </Grid>

        <Grid item xs={12}>
          {/* Below component is experimental. TODO: Consider for future use. */}
          {/* <QuestionType /> */}
          <Collapse in={showAdvanced}>
            <Box mt={2}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>{t('assessments:AI.questionTypes')}</Typography>
                  <FormGroup>
                    {Object.entries(values.AISettings.questionTypes).map(([key, value]) => (
                      <FormControlLabel
                        key={key}
                        control={
                          <Checkbox
                            checked={value}
                            onChange={handleQuestionTypeChange}
                            name={key}
                          />
                        }
                        label={t(`assessments:${key}`)}
                      />
                    ))}
                  </FormGroup>
                  <FormHelperText>{t('assessments:AI.questionTypesHelperText')}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.AISettings.strictMode}
                        onChange={e =>
                          setFieldValue('AISettings.strictMode', !values.AISettings.strictMode)
                        }
                        name='strictMode'
                      />
                    }
                    label={t('assessments:AI.useStrictMode')}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='subtitle1'>{t('assessments:AI.focusAreas')}</Typography>
                  <TextField
                    fullWidth
                    value={newFocusArea}
                    onChange={e => setNewFocusArea(e.target.value)}
                    margin='normal'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <Button variant='outlined' onClick={handleAddFocusArea}>
                            {t('common:add')}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText>{t('assessments:AI.focusAreasHelperText')}</FormHelperText>
                  <Box mt={1}>
                    {values.AISettings.focusAreas.map(area => (
                      <Chip
                        key={area}
                        label={area}
                        onDelete={() => handleRemoveFocusArea(area)}
                        style={{ margin: '0 4px 4px 0' }}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    {t('assessments:AI.questionFormatPreferences')}
                  </Typography>
                  <RadioGroup
                    name='questionFormat'
                    value={values.AISettings.questionFormat}
                    onChange={e => setFieldValue('AISettings.questionFormat', e.target.value)}
                  >
                    <FormControlLabel
                      value='short'
                      control={<Radio />}
                      label={t('assessments:AI.questionFormatPreferencesOptions.shortQuestions')}
                    />
                    <FormControlLabel
                      value='detailed'
                      control={<Radio />}
                      label={t('assessments:AI.questionFormatPreferencesOptions.detailedQuestions')}
                    />
                    <FormControlLabel
                      value='scenario'
                      control={<Radio />}
                      label={t(
                        'assessments:AI.questionFormatPreferencesOptions.scenarioBasedQuestions',
                      )}
                    />
                  </RadioGroup>
                  <FormHelperText>
                    {t('assessments:AI.questionFormatPreferencesHelperText')}
                  </FormHelperText>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuizSettings;
