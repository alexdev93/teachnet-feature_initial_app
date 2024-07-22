import { GetServerSideProps } from 'next';

import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DefaultLayout from 'src/layouts/DefaultLayout';
import AssignmentOverviewHeader from 'src/components/assignment/overview/Header';
import AssignmentOverviewBody from 'src/components/assignment/overview/Body';

const AssignmentOverview = () => {
  return (
    <DefaultLayout>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <AssignmentOverviewHeader />
        </Grid>
      </Grid>
      <Grid item sx={{ my: 2 }}>
        <Divider />
      </Grid>
      <Grid item>
        <Box mt={3}>
          <AssignmentOverviewBody />
        </Box>
      </Grid>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'assignments'])),
  },
});

export default AssignmentOverview;
