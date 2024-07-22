import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  SelectChangeEvent,
} from '@mui/material';

export interface Option {
  id: string;
  value: string;
  label: string;
}

interface Props {
  label: string;
  options: Option[];
  onChange: (option: Option) => void;
  id?: string;
  selectProps?: SelectProps;
}

export default function Dropdown(props: Props) {
  const [value, setValue] = useState('');

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>{props.label}</InputLabel>
      <Select
        id={props.id}
        labelId={`${props.id}-label`}
        value={value}
        label={props.label}
        onChange={handleChange}
        sx={{
          '& svg': {
            fontSize: '2rem',
          },
        }}
        {...props?.selectProps}
      >
        {props.options.map(option => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
