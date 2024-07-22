import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Button from 'src/components/common/Button';

export interface IConfirmActionModalProps {
  title: string;
  body: string;
  onSubmit: () => void;
  onCancel: () => void;
  cancelBtnVariant: 'text' | 'outlined' | 'contained';
  cancelBtnColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  submitBtnVariant: 'text' | 'outlined' | 'contained';
  submitBtnColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export default function ConfirmActionModal({
  title,
  body,
  cancelBtnVariant,
  cancelBtnColor,
  submitBtnVariant,
  submitBtnColor,
  onSubmit,
  onCancel,
}: IConfirmActionModalProps) {
  const { t } = useTranslation();

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{body}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant={cancelBtnVariant ?? 'text'}
          color={cancelBtnColor ?? 'primary'}
          onClick={onCancel}
        >
          {t('common:cancel')}
        </Button>
        <Button
          variant={submitBtnVariant ?? 'contained'}
          color={submitBtnColor ?? 'success'}
          onClick={onSubmit}
        >
          {t('common:accept')}
        </Button>
      </DialogActions>
    </>
  );
}
