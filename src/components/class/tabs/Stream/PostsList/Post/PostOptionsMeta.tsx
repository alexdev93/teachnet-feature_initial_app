import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import MoreMenuButton from 'src/components/common/MoreMenuButton';

interface PostOptionsMetaProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function PostOptionsMeta({ onEdit, onDelete }: PostOptionsMetaProps) {
  const { t } = useTranslation();

  const options = [
    {
      id: 'edit-post',
      label: t('common:edit'),
      onClick: () => {
        onEdit();
      },
    },
    {
      id: 'delete-post',
      label: t('classes:stream.deletePost'),
      onClick: () => {
        onDelete();
      },
    },
  ];

  return (
    <Box display='flex' alignItems='center'>
      <MoreMenuButton id='post-options' options={options} />
    </Box>
  );
}
