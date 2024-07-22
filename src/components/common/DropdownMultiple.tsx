import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

export default function DropdownMultiple(props: Props) {
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value as string[]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>{props.label}</InputLabel>
      <Select
        id={props.id}
        labelId={`${props.id}-label`}
        value={value}
        label={props.label}
        input={<OutlinedInput label={props.label} />}
        //@ts-ignore
        renderValue={(selected: string[]) =>
          selected.map(str => props.options.find(opt => opt.value === str)?.label).join(', ')
        }
        onChange={handleChange}
        multiple
        sx={{
          '& svg': {
            fontSize: '2rem',
          },
        }}
        {...props?.selectProps}
      >
        {props.options.map(option => (
          <MenuItem key={option.id} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
