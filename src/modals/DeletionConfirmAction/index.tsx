import React from 'react';
import { useTranslation } from 'react-i18next';
import ConfirmActionModal, { IConfirmActionModalProps } from 'src/modals/ConfirmAction';

/** A wrapper for `ConfirmActionModal` that sets its props to default values for less code repetitiveness */
export default function DeletionConfirmActionModal(props: IConfirmActionModalProps) {
  const { t } = useTranslation();
  const confirmActionModalProps = {
    title: props.title || t('common:areYouSureYouWantToDelete'),
    body: props.body || t('common:youCannotUndoThisAction'),
    cancelBtnVariant: props.cancelBtnVariant || 'contained',
    submitBtnVariant: props.submitBtnVariant || 'text',
    submitBtnColor: props.submitBtnColor || 'error',
  };

  return <ConfirmActionModal {...props} {...confirmActionModalProps} />;
}
