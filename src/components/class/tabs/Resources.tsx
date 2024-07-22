import { Box, Typography, IconButton, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DescriptionIcon from '@mui/icons-material/Description';
import Button from 'src/components/common/Button';
import TextField from 'src/components/common/TextField';

const resources = [
  { id: 1, type: 'info', title: 'Homework 1: Research' },
  { id: 2, type: 'play', title: 'Quiz 1: Design Principles' },
  { id: 3, type: 'description', title: 'Quiz 1: Design Principles' },
  { id: 4, type: 'description', title: 'Homework 1: Research' },
];

const ResourceItem = ({ type, title }: { type: string; title: string }) => {
  const icon =
    type === 'info' ? <InfoIcon /> : type === 'play' ? <PlayArrowIcon /> : <DescriptionIcon />;

  return (
    <Paper
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, mb: 2 }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton>{icon}</IconButton>
        <Typography variant='body1' sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Button variant='contained'>Download</Button>
    </Paper>
  );
};

export default function ClassResources() {
  return (
    <>
      <TextField variant='outlined' fullWidth placeholder='Search for resources' sx={{ mb: 4 }} />
      {resources.map(resource => (
        <ResourceItem key={resource.id} type={resource.type} title={resource.title} />
      ))}
    </>
  );
}
