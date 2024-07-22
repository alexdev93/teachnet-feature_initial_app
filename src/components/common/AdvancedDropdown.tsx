import React, { useState, useRef, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Checkbox,
  AutocompleteProps,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export interface Option {
  label: string;
  value: string;
}

interface AdvancedDropdownProps {
  id: string;
  label: string;
  fetchOptions?: (query: string) => Promise<Option[]>; // Callback function to fetch options
  defaultOptions: Option[]; // Default options provided initially
  value?: Option | null; // Selected value
  onChange: (event: React.ChangeEvent<{}>, value: Option | Option[] | null) => void; // Change handler
  disabled?: boolean; // Disabled state
  throttleTime?: number; // Time in ms to throttle the fetch calls
  error?: boolean; // Error state
  withChips?: boolean; // Display selected options as chips
  helperText?: string | false | undefined; // Helper
  margin?: 'none' | 'dense' | 'normal'; // Margin
}

// Custom throttle function
function throttle(func: (...args: any[]) => void, delay: number) {
  let lastCall = 0;

  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;

    return func(...args);
  };
}
/**
 * 
 * @example
 * const fetchOptionsFromApi = async (query: string) => {
  const response = await axios.get('/api/options', {
    params: { search: query },
  });
  return response.data.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
};

const fetchDefaultOptions = async () => {
  const response = await axios.get('/api/default-options');
  return response.data.map((item: any) => ({
    label: item.name,
    value: item.id,
  }));
};

const MyComponent = () => {
  const [defaultOptions, setDefaultOptions] = useState<Option[]>([]);

  useEffect(() => {
    const loadDefaultOptions = async () => {
      const options = await fetchDefaultOptions();
      setDefaultOptions(options);
    };

    loadDefaultOptions();
  }, []);

  return (
    <div>
      <h1>Search Users</h1>
      <AdvancedDropdown
        label="User"
        fetchOptions={fetchOptionsFromApi}
        defaultOptions={defaultOptions}
      />
    </div>
  );
};

 */
const AdvancedDropdown: React.FC<AdvancedDropdownProps> = ({
  id,
  label,
  fetchOptions,
  defaultOptions,
  value,
  onChange,
  disabled = false,
  throttleTime = 300,
  error = false,
  withChips = false,
  helperText = '',
  margin = 'normal',
}) => {
  const [options, setOptions] = useState<Option[]>(defaultOptions);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchOptions = async (query: string) => {
    if (query) {
      setLoading(true);
      try {
        if (!fetchOptions) return;
        const fetchedOptions = await fetchOptions(query);
        setOptions(fetchedOptions);
      } catch (error) {
        console.error('Failed to fetch options:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setOptions(defaultOptions); // Reset to default options if query is empty
    }
  };

  const throttledFetchOptions = useRef(throttle(handleFetchOptions, throttleTime)).current;

  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    setInputValue(value);
    throttledFetchOptions(value);
  };

  useEffect(() => {
    // Set default options initially
    setOptions(defaultOptions);
  }, [defaultOptions]);

  const autocompleteProps: AutocompleteProps<Option, boolean, boolean, boolean, React.ElementType> =
    {
      id,
      options,
      getOptionLabel: option => {
        // We don't support an array of strings as options. This check is to make the TS compiler happy.
        if (typeof option === 'string') {
          return option;
        }

        return option.label;
      },
      filterOptions: x => x, // Disable built-in filtering
      onInputChange: handleInputChange,
      inputValue,
      loading,
      value,
      onChange: (e, value, reason) => {
        onChange(e, value as Option | Option[] | null);
      },
      disabled,
      isOptionEqualToValue: (option, value) => option.value === value.value,
      renderInput: params => (
        <TextField
          {...params}
          label={label}
          variant='outlined'
          error={error}
          helperText={helperText}
          margin={margin}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      ),
    };

  if (withChips) {
    autocompleteProps.multiple = true;
    autocompleteProps.renderOption = (props, option, { selected }) => (
      <li {...props}>
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
          checkedIcon={<CheckBoxIcon fontSize='small' />}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.label}
      </li>
    );
    autocompleteProps.disableCloseOnSelect = true;
    autocompleteProps.limitTags = 5;
  }

  return <Autocomplete {...autocompleteProps} />;
};

export default AdvancedDropdown;
