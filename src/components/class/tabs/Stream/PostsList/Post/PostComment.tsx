import React, { useState } from 'react';
import { Box, Avatar, Typography, Grid, useTheme, IconButton } from '@mui/material';
import Button from 'src/components/common/Button';
import { stringAvatar } from 'src/utils/avatar';
import { formatDate } from 'date-fns';
import { useTranslation } from 'next-i18next';
import MoreMenuButton from 'src/components/common/MoreMenuButton';
import useModalStore from 'src/store/modal';
import { EModalID } from 'src/modals/ModalsFactory';
import Link from 'next/link';
import { IPostComment } from 'src/components/class/tabs/Stream/PostsList/Post/types';
import TextFieldPlain from 'src/components/common/TextFieldPlain';
import CheckIcon from '@mui/icons-material/CheckOutlined';
import LoadingButtonV2 from 'src/components/common/LoadingButtonV2';

export default function PostComment(props: { comment: IPostComment }) {
  const { t } = useTranslation();
  const theme = useTheme();

  // TODO: Implement pagination once API is ready
  // TODO: Consider fetching comments directly inside this component instead of passing them as props
  const { comment } = props;

  const [editing, setEditing] = useState(false);

  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  const handleEditComment = () => {
    setEditing(false);
  };

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

  const isAuthor = comment.user.fullName === 'Muhammed Aldulaimi';

  return (
    <Grid container>
      <Grid item xs={12} mb={1}>
        <Grid container justifyContent='space-between'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt='User'
              src='https://via.placeholder.com/40'
              sx={{ width: 40, height: 40, mr: 2 }}
              {...stringAvatar(comment.user.fullName)}
            />
            <Box width='100%'>
              <Link
                href={`/${comment.user.role === 'teacher' ? 'teachers' : 'students'}/${comment.user.id}`}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant='body1'
                  sx={theme => ({ fontWeight: 'bold', color: theme.palette.primary.light })}
                >
                  {comment.user.fullName}
                </Typography>
              </Link>
              <Typography variant='caption' color='text.secondary'>
                {formatDate(comment.date, 'yyyy-MM-dd HH:mm')}
              </Typography>
            </Box>
          </Box>

          {isAuthor &&
            (editing ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LoadingButtonV2
                  loading={false}
                  buttonProps={{
                    variant: 'contained',
                    color: 'primary',
                    onClick: () => {
                      handleEditComment();
                    },
                  }}
                >
                  <CheckIcon />
                </LoadingButtonV2>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MoreMenuButton
                  id='comment-options'
                  options={[
                    {
                      id: 'edit-comment',
                      label: t('classes:stream.editComment'),
                      onClick: () => setEditing(true),
                    },
                    {
                      id: 'delete-comment',
                      label: t('classes:stream.deleteComment'),
                      onClick: handleDeleteComment,
                    },
                  ]}
                />
              </Box>
            ))}
        </Grid>
      </Grid>
      <Grid item mb={1} xs={12}>
        <Box>
          {editing ? (
            <TextFieldPlain
              defaultValue={comment.content}
              fullWidth
              inputProps={{
                style: {
                  fontSize: '0.875rem',
                  borderBottom: `solid 1px ${theme.palette.secondary.contrastText}`,
                },
              }}
              autoFocus
            />
          ) : (
            <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
              {comment.content}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
