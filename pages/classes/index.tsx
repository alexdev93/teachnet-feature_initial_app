import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Typography, Tabs, Tab, List, InputAdornment, Grid } from '@mui/material';
import DefaultLayout from 'src/layouts/DefaultLayout';
import SearchIcon from 'src/svgs/SearchIcon';
import { useTranslation } from 'next-i18next';
import TextField from 'src/components/common/TextField';
import NewClassButton, { NewClassButtonMobile } from 'src/components/classes/NewClassButton';
import useIsMobile from 'src/components/hooks/useIsMobile';
import ClassListItem from 'src/components/classes/ClassListItem';
import LoadingButton from 'src/components/common/LoadingButton';
import SearchInput from 'src/components/common/SearchInput';

const classes = [
  { id: 1, title: 'Data Science for Business', image: '', url: '/classes/123' },
  { id: 2, title: 'Data Science for Business', image: '', url: '/classes/123' },
  { id: 3, title: 'Data Science for Business', image: '', url: '/classes/123' },
  { id: 4, title: 'Data Science for Business', image: '', url: '/classes/123' },
  { id: 5, title: 'Data Science for Business', image: '/images/class5.png', url: '/classes/123' },
];

const MyClasses: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <DefaultLayout>
      <Typography variant='h4' gutterBottom fontWeight={600}>
        {t('classes:myClasses')}
      </Typography>
      <Grid container alignItems='center' spacing={1}>
        <Grid item xs={isMobile ? 10 : 12}>
          <SearchInput placeholder='Search for class' sx={{ mb: 3 }} fullWidth margin='normal' />
        </Grid>
        {isMobile && (
          <Grid item xs={2}>
            <NewClassButtonMobile />
          </Grid>
        )}
      </Grid>
      <Grid
        container
        mb={3}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        sx={theme => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Grid item>
          <Tabs value={tabValue} onChange={handleChange} centered>
            <Tab label='In progress' />
            <Tab label='Completed' />
          </Tabs>
        </Grid>
        {!isMobile && (
          <Grid item>
            <NewClassButton />
          </Grid>
        )}
      </Grid>
      <List>
        {classes.map(cls => (
          <ClassListItem key={cls.id} cls={cls} />
        ))}
      </List>
      <Grid container justifyContent='center' mt={3}>
        <Grid item width={200}>
          <LoadingButton loading={false}>{t('loadMore')}</LoadingButton>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common', 'classes'])),
  },
});

export default MyClasses;
