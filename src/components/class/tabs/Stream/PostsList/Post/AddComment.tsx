import React, { useState } from 'react';
import { Avatar, Box, Grid, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { stringAvatar } from 'src/utils/avatar';
import TextField from 'src/components/common/TextField';
import LoadingButtonV2 from 'src/components/common/LoadingButtonV2';
import { useTranslation } from 'next-i18next';

const AddComment = ({ onSubmit }: { onSubmit: (comment: string) => void }) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState('');

  const handleSend = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment(''); // Clear the comment field after sending
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent new line creation
      handleSend();
    }
  };

  return (
    <Grid container alignItems='center' spacing={1}>
      <Grid item>
        <Avatar
          alt='User'
          src='https://via.placeholder.com/40'
          sx={{ width: 40, height: 40 }}
          {...stringAvatar('Muhammed Aldulaimi')}
        />
      </Grid>
      <Grid item xs>
        <TextField
          value={comment}
          onChange={e => setComment(e.target.value)}
          onKeyDown={handleKeyPress}
          multiline
          fullWidth
          label={t('classes:stream.addComment')}
        />
      </Grid>
      <Grid item>
        <Box display='flex' alignItems='center'>
          <LoadingButtonV2 loading={false} buttonProps={{ onClick: handleSend }}>
            <SendIcon color='primary' />
          </LoadingButtonV2>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddComment;
