import React from 'react';
import { Box, Paper, Grid, Divider, Typography } from '@mui/material';
import PostComments from 'src/components/class/tabs/Stream/PostsList/Post/PostComments';
import AddComment from 'src/components/class/tabs/Stream/PostsList/Post/AddComment';
import PostAuthor from 'src/components/class/tabs/Stream/PostsList/Post/PostAuthor';
import { PostProps } from 'src/components/class/tabs/Stream/PostsList/Post/types';
import useModalStore from 'src/store/modal';
import { EModalID } from 'src/modals/ModalsFactory';
import PostFile from 'src/components/class/tabs/Stream/PostsList/Post/PostFiles/PostFile';
import { useRouter } from 'next/router';
import { upsertQueryParam } from 'src/utils/queryParams';
import PostOptionsMeta from 'src/components/class/tabs/Stream/PostsList/Post/PostOptionsMeta';

const Post: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();

  const isAuthor = post.user.fullName === 'Muhammed Aldulaimi';
  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  const handleEdit = () => {
    // Add post id to query param, triggering the edit post modal
    upsertQueryParam(router, 'postId', post.id);
  };

  const handleDelete = () => {
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
    <Paper
      sx={theme => ({
        p: 2,
        mt: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        boxShadow: 'none',
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PostAuthor post={post} />
        {isAuthor && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PostOptionsMeta onDelete={handleDelete} onEdit={handleEdit} />
          </Box>
        )}
      </Box>
      <Typography variant='body2' sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
        {post.content}
      </Typography>
      {post.files && post.files.length > 0 && (
        <Box mt={2}>
          <Grid container spacing={2}>
            {post.files.map((file, index) => (
              <Grid item key={index}>
                <PostFile file={file} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Box width='95%'>
          <PostComments comments={post.comments} postId={post.id} />
          <Box mt={1}>
            <AddComment onSubmit={comment => console.log('comment: ', comment)} />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Post;
