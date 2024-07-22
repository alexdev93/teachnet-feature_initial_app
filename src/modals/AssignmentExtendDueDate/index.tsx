import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Button from 'src/components/common/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import MUIDateLocalizationProvider from 'src/components/providers/MUIDateLocalizationProvider';

export interface IConfirmActionModalProps {
  onSubmit: () => void;
  onCancel: () => void;
}

export default function AssignmentExtendDueDate({ onSubmit, onCancel }: IConfirmActionModalProps) {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>{t('assignments:extendDueDate')}</DialogTitle>
      <DialogContent>
        <MUIDateLocalizationProvider>
          <Grid container mt={1}>
            <Grid item xs={12}>
              <DateTimePicker label={t('assignments:updatedDueDate')} />
            </Grid>
          </Grid>
        </MUIDateLocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button variant='text' color='primary' onClick={onCancel}>
          {t('common:cancel')}
        </Button>
        <Button variant='contained' color='success' onClick={onSubmit}>
          {t('common:accept')}
        </Button>
      </DialogActions>
    </>
  );
}
