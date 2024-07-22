import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ReactNode } from 'react';

// TODO: May need to add locale support: See here: https://mui.com/x/react-date-pickers/adapters-locale/
export default function MUIDateLocalizationProvider({ children }: { children: ReactNode }) {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
}
