import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { stringAvatar } from 'src/utils/avatar';
import { useTranslation } from 'next-i18next';
import { Post } from 'src/components/class/tabs/Stream/PostsList/Post/types';
import { formatDate } from 'date-fns';
import Link from 'next/link';

export default function PostAuthor({ post }: { post: Post }) {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        alt='User'
        src='https://via.placeholder.com/40'
        sx={{ width: 40, height: 40, mr: 2 }}
        {...stringAvatar(post.user.fullName)}
      />
      <Box>
        <Link
          href={`/${post.user.role === 'teacher' ? 'teachers' : 'students'}/${post.user.id}`}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            variant='body1'
            sx={theme => ({ fontWeight: 'bold', color: theme.palette.primary.light })}
          >
            {post.user.fullName}
          </Typography>
        </Link>
        <Typography variant='caption' color='text.secondary'>
          {formatDate(post.date, 'yyyy-MM-dd HH:mm')}
        </Typography>
        {post.edited && (
          <Typography variant='caption' color='text.secondary'>
            {' '}
            {t('common:edited')}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
