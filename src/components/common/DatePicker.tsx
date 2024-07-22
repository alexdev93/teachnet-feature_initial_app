import { DatePickerProps, DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePicker(props: DatePickerProps<any, any>) {
  return <MUIDatePicker {...props} />;
}
