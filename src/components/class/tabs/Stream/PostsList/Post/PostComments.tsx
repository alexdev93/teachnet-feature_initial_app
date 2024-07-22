import React from 'react';
import { Box } from '@mui/material';
import Button from 'src/components/common/Button';
import { useTranslation } from 'next-i18next';
import useModalStore from 'src/store/modal';
import { EModalID } from 'src/modals/ModalsFactory';
import { IPostComment } from 'src/components/class/tabs/Stream/PostsList/Post/types';
import PostComment from 'src/components/class/tabs/Stream/PostsList/Post/PostComment';

interface Props {
  comments: IPostComment[];
  postId: string;
}

export default function PostComments(props: Props) {
  const { t } = useTranslation();

  // TODO: Implement pagination once API is ready
  // TODO: Consider fetching comments directly inside this component instead of passing them as props
  const { comments, postId } = props;

  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  const handleDeleteComment = () => {
    openModal(EModalID.CONFIRM_DELETION_ACTION, {
      onSubmit: () => {
        console.info('delete');
        closeModal();
      },
      onCancel: () => {
        closeModal();
      },
    });
  };

  return (
    <Box>
      {comments.map(comment => {
        return (
          <Box
            key={comment.id}
            sx={theme => ({ borderBottom: `1px solid ${theme.palette.divider}`, mb: 1 })}
          >
            <PostComment comment={comment} key={comment.id} />
            <Box sx={theme => ({ mb: 1 })}></Box>
          </Box>
        );
      })}
      {comments?.length > 3 && (
        <Button
          size='small'
          onClick={() => {
            console.info('TODO: Fetch more ');
          }}
        >
          {t('common:loadMore')}
        </Button>
      )}
    </Box>
  );
}
