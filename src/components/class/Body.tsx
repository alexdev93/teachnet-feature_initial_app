import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Tabs, Tab, Grid } from '@mui/material';
import { ClassTab, getClassTabs } from 'src/components/class/Tabs';
import { useRouter } from 'next/router';
import { upsertQueryParam } from 'src/utils/queryParams';

export default function ClassBody() {
  const { t } = useTranslation();
  const router = useRouter();

  const classTabs = getClassTabs(t);

  const [tabValue, setTabValue] = useState(router.query.tab as ClassTab);

  // Update tab value when query param changes
  useEffect(() => {
    if (router.query?.tab) {
      setTabValue(router.query.tab as ClassTab);
    }
  }, [router.query?.tab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: ClassTab) => {
    setTabValue(newValue);
    upsertQueryParam(router, 'tab', newValue);
  };

  const activeComponent = classTabs.find(tab => tab.id === tabValue)?.component as JSX.Element;

  return (
    <>
      <Grid container mt={4} sx={theme => ({ borderBottom: `1px solid ${theme.palette.divider}` })}>
        <Grid item xs={12}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label='class tabs'>
            {classTabs.map(tab => (
              <Tab key={tab.id} label={tab.label} value={tab.id} />
            ))}
          </Tabs>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4 }}>{activeComponent}</Box>
    </>
  );
}
