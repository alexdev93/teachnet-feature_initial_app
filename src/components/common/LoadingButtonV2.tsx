import { CircularProgress } from '@mui/material';
import Button, { Props as ButtonProps } from 'src/components/common/Button';

interface Props {
  buttonProps?: ButtonProps;
  loading: boolean;
  children: React.ReactNode;
}

export default function LoadingButtonV2(props: Props) {
  return (
    <Button disabled={props.loading ? true : props.buttonProps?.disabled} {...props.buttonProps}>
      {props.loading ? <CircularProgress size={30} /> : props.children}
    </Button>
  );
}
