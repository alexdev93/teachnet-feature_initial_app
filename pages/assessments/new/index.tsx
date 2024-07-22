import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';
import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import PencilIcon from '@mui/icons-material/ModeOutlined';
import QuizIcon from '@mui/icons-material/QuizOutlined';
import AppBarLayout from 'src/layouts/AppBarLayout';
import Link from 'next/link';

const NewAssessment: React.FC = () => {
  const { t } = useTranslation();

  const options = [
    {
      id: 'homework',
      value: 'homework',
      label: t('common:homework'),
      icon: PencilIcon,
      href: '/assessments/new/homework',
    },
    {
      id: 'quiz',
      value: 'quiz',
      label: t('common:quiz'),
      icon: QuizIcon,
      href: '/assessments/new/quiz',
    },
  ];

  return (
    <AppBarLayout>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant='h5' gutterBottom>
            {t('assessments:chooseYourAssessmentType')}
          </Typography>
          <Grid container spacing={4} mt={2} justifyContent='center'>
            {options.map(option => (
              <Grid item key={option.id}>
                <Link href={option.href} style={{ textDecoration: 'none' }}>
                  <Paper
                    sx={theme => ({
                      padding: theme.spacing(4),
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                      minWidth: '200px',
                    })}
                    elevation={3}
                  >
                    <option.icon
                      sx={theme => ({
                        fontSize: '4rem',
                        marginBottom: theme.spacing(2),
                      })}
                    />
                    <Typography variant='h6'>{option.label}</Typography>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </AppBarLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'assessments'])),
  },
});

export default NewAssessment;
