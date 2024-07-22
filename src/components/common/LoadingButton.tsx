import MuiLoadingButton, {
  LoadingButtonProps as MuiLoadingButtonProps,
} from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import { commonButtonStyles } from './Button';

interface LoadingButtonProps extends MuiLoadingButtonProps {}

interface Props extends LoadingButtonProps {}

const StyledLoadingButton = styled(MuiLoadingButton)(theme => ({
  ...commonButtonStyles,
}));

export default function LoadingButton(props: Props) {
  return <StyledLoadingButton {...props} fullWidth />;
}
