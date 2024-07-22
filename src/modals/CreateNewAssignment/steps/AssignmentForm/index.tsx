import React from 'react';
import {
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  useTheme,
} from '@mui/material';
import Button from 'src/components/common/Button';
import AdvancedDropdown from 'src/components/common/AdvancedDropdown';
import { useTranslation } from 'next-i18next';
import MUIDateLocalizationProvider from 'src/components/providers/MUIDateLocalizationProvider';
import DatePicker from 'src/components/common/DatePicker';
import TimePicker from 'src/components/common/TimePicker';
import { Field, ErrorMessage as FormikErrorMessage, ErrorMessageProps } from 'formik';
import TextField from 'src/components/common/TextField';

function ErrorMessage(props: ErrorMessageProps) {
  const theme = useTheme();

  return (
    <FormikErrorMessage
      {...props}
      //@ts-ignore
      style={{
        color: theme.palette.error.main,
      }}
    />
  );
}

import { FormikProps } from 'formik';
import { FormikInitialValues } from 'src/modals/CreateNewAssignment/types';

interface NewAssignmentFormStepProps {
  formik: FormikProps<FormikInitialValues>;
  onNext: () => void;
  onPrev: () => void;
  onChange?: (values: FormikInitialValues) => void;
}

const NewAssignmentFormStep: React.FC<NewAssignmentFormStepProps> = ({
  formik,
  onNext,
  onPrev,
  onChange,
}) => {
  const { t } = useTranslation();

  const { values, touched, errors, setFieldValue } = formik;

  return (
    <>
      <Box>
        <Typography variant='body2'>{t('assignments:type')}</Typography>
        <Grid container>
          <Grid item xs={12}>
            <ToggleButtonGroup
              sx={{ width: '100%' }}
              color='primary'
              value={values.assignmentType}
              exclusive
              onChange={(event, newValue) => {
                // Prevent unselecting the current value, that way we can always have an option selected
                if (!newValue) return;
                setFieldValue('assignmentType', newValue);
              }}
              aria-label='Platform'
            >
              <ToggleButton fullWidth value='homework'>
                {t('assignments:homework')}
              </ToggleButton>
              <ToggleButton fullWidth value='quiz'>
                {t('assignments:quiz')}
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Box>
      {values.assignmentType && (
        <>
          <FormControl fullWidth margin='normal'>
            <AdvancedDropdown
              id='assignment-type-dropdown'
              label={t(`assignments:${values.assignmentType}`)}
              defaultOptions={[
                {
                  label: 'Option 1',
                  value: 'option1',
                },
                {
                  label: 'Option 2',
                  value: 'option2',
                },
              ]}
              fetchOptions={async (query: string) => {
                // Implement fetching options based on the query
                return [];
              }}
              value={values.assignmentTypeDropdown}
              onChange={(e, option) => {
                setFieldValue('assignmentTypeDropdown', option);
              }}
              error={
                touched.assignmentTypeDropdown ? Boolean(errors.assignmentTypeDropdown) : false
              }
            />
            <ErrorMessage name='assignmentTypeDropdown' component='div' />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <AdvancedDropdown
              id='class-dropdown'
              label={t('classes:class')}
              value={values.classDropdown}
              disabled
              defaultOptions={[]}
              onChange={(e, option) => {
                setFieldValue('classDropdown', option);
              }}
              fetchOptions={async (query: string) => {
                // Implement fetching options based on the query
                return [];
              }}
              error={touched.classDropdown ? Boolean(errors.classDropdown) : false}
            />
            <ErrorMessage name='classDropdown' component='div' />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <Field
              as={TextField}
              name='title'
              label={t('common:title')}
              placeholder={t('assignments:assignmentTitlePlaceholder')}
              variant='outlined'
              error={touched.title && Boolean(errors.title)}
            />
            <ErrorMessage name='title' component='div' />
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <Field
              as={TextField}
              name='description'
              label={t('common:description')}
              placeholder={t('assignments:assignmentDescriptionPlaceholder')}
              variant='outlined'
              error={touched.description && Boolean(errors.description)}
            />
            <ErrorMessage name='description' component='div' />
          </FormControl>
          <MUIDateLocalizationProvider>
            <Grid container spacing={2}>
              <Grid item>
                <FormControl fullWidth margin='normal'>
                  <Typography mb={1} variant='body2'>
                    {t('assignments:passingGrade')}
                  </Typography>
                  <Field
                    as={TextField}
                    name='passingGrade'
                    placeholder={t('assignments:passingGradePlaceholder')}
                    variant='outlined'
                    type='number'
                    error={touched.passingGrade && Boolean(errors.passingGrade)}
                  />
                  <ErrorMessage name='passingGrade' component='div' />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth margin='normal'>
                  <Typography mb={1} variant='body2'>
                    {t('common:dueDate')}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item>
                      <DatePicker
                        label={t('common:date')}
                        format='yyyy-MM-dd'
                        value={values.dueDate}
                        onChange={date => setFieldValue('dueDate', date)}
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            error: touched.dueDate && Boolean(errors.dueDate),
                            helperText: touched.dueDate && errors.dueDate,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label={t('common:timeOptional')}
                        value={values.dueTime}
                        onChange={time => setFieldValue('dueTime', time)}
                        slotProps={{
                          textField: {
                            variant: 'outlined',
                            error: touched.dueTime && Boolean(errors.dueTime),
                            helperText: touched.dueTime && errors.dueTime,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </MUIDateLocalizationProvider>
          <FormControl fullWidth margin='normal'>
            <Typography>{t('assignments:assignmentMethod')}</Typography>
            <RadioGroup
              name='assignMethod'
              value={values.assignMethod}
              onChange={(e, newValue) => setFieldValue('assignMethod', newValue)}
            >
              <FormControlLabel
                value='all'
                control={<Radio />}
                label={t('assignments:assignmentMethods.all')}
              />
              <FormControlLabel
                value='manual'
                control={<Radio />}
                label='Manually choose and assign learners'
              />
            </RadioGroup>
          </FormControl>
          <Box display='flex' justifyContent='flex-end' mt={2}>
            <Button
              variant='outlined'
              sx={{ minWidth: '100px' }}
              style={{ marginRight: '8px' }}
              onClick={() => onPrev()}
            >
              {t('common:cancel')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ minWidth: '100px' }}
              onClick={() => {
                onNext();
                // formik.validateForm().then(errors => {
                //   if (Object.keys(errors).length === 0) {
                //     // Form is valid, do any success call
                //     console.info('Form is valid');
                //     onNext();
                //   } else {
                //     formik.setTouched(
                //       setNestedObjectValues<FormikTouched<FormikInitialValues>>(errors, true),
                //     );
                //   }
                // });
              }}
            >
              {t('common:next')}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default NewAssignmentFormStep;
