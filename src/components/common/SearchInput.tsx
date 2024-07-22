import { InputAdornment } from '@mui/material';
import SearchIcon from 'src/svgs/SearchIcon';
import TextField, { Props as TextFieldProps } from './TextField';

interface Props extends TextFieldProps {}

export default function SearchInput(props: Props) {
  return (
    <TextField
      variant='outlined'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}
