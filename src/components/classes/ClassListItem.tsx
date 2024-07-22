import { Avatar, ListItem, ListItemAvatar, ListItemText, colors } from '@mui/material';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import Link from 'next/link';

interface Props {
  cls: {
    id: number;
    image: string;
    title: string;
    url: string;
  };
}

export default function ClassListItem(props: Props) {
  const { cls } = props;

  return (
    <Link href={cls.url} style={{ textDecoration: 'none' }}>
      <ListItem
        key={cls.id}
        sx={theme => ({
          border: `1px solid ${theme.palette.divider}`,
          marginY: 1,
          paddingY: 2,
          borderRadius: 1,
        })}
      >
        <ListItemAvatar>
          {cls.image ? (
            <Avatar variant='rounded' src={cls.image} />
          ) : (
            <Avatar variant='rounded'>
              <ClassRoundedIcon />
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={cls.title}
          sx={theme => ({
            color: theme.palette.text.primary,
          })}
        />
        {/* <IconButton edge='end'>
            <MoreVertIcon />
        </IconButton> */}
      </ListItem>
    </Link>
  );
}
