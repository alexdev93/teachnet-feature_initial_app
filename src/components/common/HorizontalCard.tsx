import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import HomeworkIcon from 'src/svgs/classes/HomeworkIcon';

// Define a type for the props
type HorizontalCardProps = {
  title: string;
  description: string;
  dueDate: Date;
  onButtonClick: () => void;
};

const HorizontalCard: React.FC<HorizontalCardProps> = ({
  title,
  description,
  dueDate,
  onButtonClick,
}) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      <Box
        sx={theme => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          borderRadius: theme.shape.borderRadius,
          marginX: 2,
        })}
      >
        <HomeworkIcon transform='scale(1.5)' />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography variant='h6' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {`Due date: ${dueDate}`}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <Button onClick={onButtonClick} size='small' variant='outlined'>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default HorizontalCard;
