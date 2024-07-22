import Button from 'src/components/common/Button';
import GoBackIcon from 'src/svgs/GoBackIcon';

// TODO: Add props type
export default function GoBackButton({ styles, onClick }: any) {
  return (
    <Button
      sx={theme => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        ...styles,
      })}
      size='large'
      onClick={onClick}
    >
      <GoBackIcon style={{ width: '30px', height: '15px' }} />
    </Button>
  );
}
