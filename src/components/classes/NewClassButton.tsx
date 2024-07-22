import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Button from 'src/components/common/Button';

// Used in mobile view
export function NewClassButtonMobile() {
  return (
    <IconButton
      size='large'
      sx={theme => ({
        borderRadius: 12,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      })}
    >
      <AddIcon />
    </IconButton>
  );
}

export default function NewClassButton() {
  const { t } = useTranslation('classes');

  const handleClick = () => {
    console.log('New class button clicked');
  };

  return (
    <Button variant='contained' color='primary' onClick={handleClick}>
      {t('classes:newClass')}
    </Button>
  );
}
