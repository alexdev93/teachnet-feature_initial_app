import { TimePicker as MUITimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';

export default function TimePicker(props: TimePickerProps<any, any>) {
  return <MUITimePicker {...props} />;
}
