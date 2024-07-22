import React, { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container, Paper, Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import Stepper from 'src/components/common/Stepper';
import { useTranslation } from 'next-i18next';
import AppBarLayout from 'src/layouts/AppBarLayout';
import { GetServerSideProps } from 'next';
import { QuizFormValues } from 'src/types/assessments/quizzes';
import { getQuizValidationSchema } from 'src/components/assessments/quizzes/validationSchema';
import BasicInformation from 'src/components/assessments/quizzes/steps/BasicInformation';
import AIGeneration from 'src/components/assessments/quizzes/steps/AIGeneration';
import QuizSettings from 'src/components/assessments/quizzes/steps/QuizSettings';

const initialValues: QuizFormValues = {
  title: '',
  timeLimit: '',
  successPercentage: '',
  description: '',
  tags: [],
  useAI: true,
  uploadedFiles: [],
  AISettings: {
    numQuestions: 0,
    difficulty: '',
    questionTypes: {
      multipleChoice: false,
      trueFalse: false,
      fillInTheBlank: false,
    },
    strictMode: false,
    focusAreas: [],
    questionFormat: '',
  },
};

const CreateQuiz: React.FC = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const steps = ['Basic Information', 'AI Generation', 'Quiz Settings'];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicInformation />;
      case 1:
        return <AIGeneration />;
      case 2:
        return <QuizSettings />;
      default:
        return null;
    }
  };

  return (
    <AppBarLayout>
      <Container
        maxWidth='lg'
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={getQuizValidationSchema(t)}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
            // Handle form submission logic here
          }}
        >
          {({ isSubmitting, values }) => (
            <Form style={{ width: '100%' }}>
              <Paper elevation={3} sx={{ padding: '20px', width: '100%' }}>
                <Stepper currentStep={activeStep} totalSteps={3} />
                <Box
                  mt={4}
                  mb={2}
                  sx={{
                    height: '500px',
                    overflowY: 'auto',
                    padding: '16px',
                  }}
                >
                  {renderStepContent(activeStep)}
                </Box>
                <Box mt={2} display='flex' justifyContent='space-between'>
                  <Button onClick={handleBack} disabled={activeStep === 0}>
                    Back
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={
                      activeStep === steps.length - 1 ? () => console.log('Submit') : handleNext
                    }
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </Paper>
            </Form>
          )}
        </Formik>
      </Container>
    </AppBarLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'assessments'])),
  },
});

export default CreateQuiz;
