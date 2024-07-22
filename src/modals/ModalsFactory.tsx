import React, { useEffect } from 'react';
import { Dialog } from '@mui/material';
import useModalStore from 'src/store/modal';
import EditPost from 'src/modals/EditPost';
import { useRouter } from 'next/router';
import { removeQueryParam } from 'src/utils/queryParams';
// MODALS //
import DeletionConfirmActionModal from 'src/modals/DeletionConfirmAction';
import ConfirmActionModal from 'src/modals/ConfirmAction';
import AssignmentExtendDueDate from 'src/modals/AssignmentExtendDueDate';
import CreateNewAssignment from 'src/modals/CreateNewAssignment';

export enum EModalID {
  EDIT_POST = 'EDIT_POST',
  CONFIRM_ACTION = 'CONFIRM_ACTION',
  CONFIRM_DELETION_ACTION = 'CONFIRM_DELETION_ACTION',
  ASSIGNMENTS_EXTEND_DUE_DATE = 'ASSIGNMENTS_EXTEND_DUE_DATE',
  CREATE_NEW_ASSIGNMENT = 'CREATE_NEW_ASSIGNMENT',
}

const queryParamRouterMap: { [key: string]: EModalID } = {
  ['postId']: EModalID.EDIT_POST,
};

const ModalFactory: React.FC = () => {
  const router = useRouter();

  const { isOpen, modalType, source, modalProps, closeModal, openModal } = useModalStore();

  // Handles opening modals based on query parameters. For example, if the query parameter "postId" is present, the "EDIT_POST" modal will be opened.
  useEffect(() => {
    const { query } = router;
    const queryKeys = Object.keys(query);

    if (queryKeys.length === 0) {
      // No query parameters
      return;
    }

    const modalQueryKey = queryKeys.find(key => queryParamRouterMap[key]);

    if (!modalQueryKey) {
      // No modal query parameter
      return;
    }

    // Open modal based on query parameter
    openModal(queryParamRouterMap[modalQueryKey], {}, 'queryParam');
  }, [router.query]);

  // Handles closing modals based on query parameters. For example, if the query parameter "postId" is removed, the "EDIT_POST" modal will be closed.
  useEffect(() => {
    if (!isOpen && source === 'queryParam') {
      const key = Object.keys(queryParamRouterMap).find(
        key => queryParamRouterMap[key] === modalType,
      );
      if (key) removeQueryParam(router, key);
    }
  }, [isOpen]);

  if (!modalType) return null;

  const renderModalContent = () => {
    switch (modalType) {
      case EModalID.EDIT_POST:
        // @ts-ignore
        return <EditPost {...modalProps} />;
      case EModalID.CONFIRM_ACTION:
        // @ts-ignore
        return <ConfirmActionModal {...modalProps} />;
      case EModalID.CONFIRM_DELETION_ACTION:
        // @ts-ignore
        return <DeletionConfirmActionModal {...modalProps} />;
      case EModalID.ASSIGNMENTS_EXTEND_DUE_DATE:
        // @ts-ignore
        return <AssignmentExtendDueDate {...modalProps} />;
      case EModalID.CREATE_NEW_ASSIGNMENT:
        // @ts-ignore
        return <CreateNewAssignment {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        closeModal();
        modalProps.onClose && modalProps.onClose();
      }}
      fullWidth
      maxWidth={
        // Hotfix for small modals. TODO: Refactor
        modalType === EModalID.CONFIRM_ACTION ||
        modalType === EModalID.CONFIRM_DELETION_ACTION ||
        modalType === EModalID.ASSIGNMENTS_EXTEND_DUE_DATE
          ? 'sm'
          : 'lg'
      }
    >
      {renderModalContent()}
    </Dialog>
  );
};

export default ModalFactory;
