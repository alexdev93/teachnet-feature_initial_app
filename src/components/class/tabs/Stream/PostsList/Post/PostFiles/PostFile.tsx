import React from 'react';
import { TFunction, useTranslation } from 'next-i18next';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  CircularProgress,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MovieIcon from '@mui/icons-material/Movie';
import {
  imageFileTypes,
  pdfFileTypes,
  videoFileTypes,
} from 'src/components/class/tabs/Stream/PostsList/Post/PostFiles/filetypes';
import ClearIcon from '@mui/icons-material/Clear';

export const cardDimensions = {
  //   maxWidth: '250px',
  //   minWidth: '200px',
  //   height: '100%',
  width: '200px',
  height: '140px',
};

export type LocalPostFile = {
  local: true;
  value: File;
};

export type RemotePostFile = {
  local: false;
  url: string;
  type: string;
  name: string;
};

export type PostFileProps = LocalPostFile | RemotePostFile;

const getFilePreview = (t: TFunction, file: PostFileProps, previewDisabled: boolean) => {
  const { local } = file;

  let url: string = '';
  let type: string = '';
  let name: string = '';

  if (local) {
    url = URL.createObjectURL(file.value);
    type = file.value.type;
    name = file.value.name;
  } else {
    url = file.url;
    type = file.type;
    name = file.name;
  }

  if (imageFileTypes.includes(type)) {
    return (
      <Card sx={{ display: 'flex', flexDirection: 'column', ...cardDimensions }}>
        <CardActionArea
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          disabled={previewDisabled}
        >
          <CardMedia component='img' sx={{ height: 68 }} image={url} alt={name} />
          <CardContent sx={{ p: 1 }}>
            <Typography component='div' variant='subtitle2' noWrap>
              {name}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {t('common:filetypes.image')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else if (pdfFileTypes.includes(type)) {
    return (
      <Card sx={{ display: 'flex', flexDirection: 'column', ...cardDimensions }}>
        <CardActionArea
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          disabled={previewDisabled}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
            <PictureAsPdfIcon style={{ fontSize: 60 }} />
          </Box>
          <CardContent sx={{ p: 1 }}>
            <Typography component='div' variant='subtitle2' noWrap>
              {name}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {t('common:filetypes.pdf')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else if (videoFileTypes.includes(type)) {
    return (
      <Card sx={{ display: 'flex', flexDirection: 'column', ...cardDimensions }}>
        <CardActionArea
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          disabled={previewDisabled}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
            <MovieIcon style={{ fontSize: 60 }} />
          </Box>
          <CardContent sx={{ p: 1 }}>
            <Typography component='div' variant='subtitle2' noWrap>
              {name}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {t('common:filetypes.video')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  } else {
    return (
      <Card sx={{ display: 'flex', flexDirection: 'column', ...cardDimensions }}>
        <CardActionArea
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          disabled={previewDisabled}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
            <InsertDriveFileIcon style={{ fontSize: 60 }} />
          </Box>
          <CardContent sx={{ p: 1 }}>
            <Typography component='div' variant='subtitle2' noWrap>
              {name}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {t('common:filetypes.file')}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
};

function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      size='small'
      onClick={onClick}
      sx={theme => ({
        bgcolor: theme.palette.secondary.main,
        '&:hover': {
          bgcolor: theme.palette.secondary.dark,
        },
      })}
    >
      <ClearIcon />
    </IconButton>
  );
}

export default function PostFile({
  file,
  onDelete,
  progress,
}: {
  file: PostFileProps;
  onDelete?: (file: PostFileProps) => void;
  progress?: number;
}) {
  const { t } = useTranslation();

  const previewDisabled = !!progress;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
      <Box
        sx={theme => ({
          position: 'absolute',
          zIndex: 1,
          right: '4px',
        })}
      >
        {onDelete && !progress && <DeleteButton onClick={() => onDelete(file)} />}

        {progress && <CircularProgress variant='determinate' value={25} />}
      </Box>
      {getFilePreview(t, file, previewDisabled)}
    </Box>
  );
}
