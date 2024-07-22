import { Box, Grid, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'next-i18next';
import Button from 'src/components/common/Button';
import { FormikInitialValues } from 'src/modals/CreateNewAssignment/types';

interface NewAssignmentConfirmationStepProps {
  formik: FormikProps<FormikInitialValues>;
  onPrev: () => void;
}

export default function NewAssignmentConfirmationStep(props: NewAssignmentConfirmationStepProps) {
  const { formik, onPrev } = props;
  const { t } = useTranslation();

  return (
    <>
      <div></div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h5' textAlign='center' color='warning.main'>
            {t('assignments:runAssignmentWarningTitle')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1' textAlign='center'>
            {t('assignments:runAssignmentWarningSubtitle')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='flex-end'>
            <Button
              variant='outlined'
              sx={{ minWidth: '100px' }}
              style={{ marginRight: '8px' }}
              onClick={() => onPrev()}
            >
              {t('common:back')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ minWidth: '100px' }}
              onClick={() => {
                formik.submitForm();
              }}
            >
              {t('assignments:publishAssignment')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
