import {
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface ButtonProps extends MuiButtonProps {}

export interface Props extends ButtonProps {
  loading?: boolean;
}

export const commonButtonStyles = {
  // borderRadius: 12,
  padding: '12px 16px',
};

const StyledButton = styled(MuiButton)(theme => ({
  ...commonButtonStyles,
}));

export default function Button(props: Props) {
  const { loading, ...rest } = props;

  return (
    <StyledButton {...rest} disabled={loading ? true : rest.disabled}>
      {loading ? <CircularProgress size={27} /> : rest.children}
    </StyledButton>
  );
}
