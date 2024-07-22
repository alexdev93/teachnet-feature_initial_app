import { Box, Card, CardActionArea } from '@mui/material';
import { cardDimensions as postFileCardDimensions } from 'src/components/class/tabs/Stream/PostsList/Post/PostFiles/PostFile';
import AddIcon from '@mui/icons-material/Add';

export default function AddPostFile({ onChange }: { onChange: (files: FileList) => void }) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    console.info('calling onChange with files: ', files);

    onChange(files);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <Card sx={{ display: 'flex', flexDirection: 'column', ...postFileCardDimensions, mb: 1 }}>
        <CardActionArea
          sx={theme => ({
            height: '100%',
            bgcolor: theme.palette.secondary.main,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          })}
          component='label' // Use label as the component to make it clickable
          htmlFor='file-input' // Associate the label with the input field
        >
          <input
            id='file-input'
            type='file'
            multiple
            style={{ display: 'none' }} // Hide the input field
            onChange={handleFileChange} // Handle file selection
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <AddIcon style={{ fontSize: 60 }} />
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
}
