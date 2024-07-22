import React from 'react';
import { Grid } from '@mui/material';
import Post from './Post';
import { Post as IPost } from 'src/components/class/tabs/Stream/PostsList/Post/types';

const PostList = ({ posts }: { posts: IPost[] }) => {
  return (
    <Grid container spacing={3}>
      {posts.map(post => (
        <Grid item xs={12} key={post.id}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostList;
