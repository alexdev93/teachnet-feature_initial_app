import { TextField as MuiTextField, TextFieldProps, TextFieldVariants } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MuiTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant?: TextFieldVariants;
}

export interface Props extends MuiTextFieldProps {}

const StyledTextField = styled(MuiTextField)(theme => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
  },
}));

export default function TextField(props: Props) {
  return <StyledTextField {...props} />;
}
