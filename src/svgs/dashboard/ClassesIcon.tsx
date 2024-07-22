import { useTheme } from '@mui/material';

export default function ClassesIcon() {
  const theme = useTheme();

  return (
    <svg
      width='16'
      height='20'
      viewBox='0 0 16 20'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V2C16 0.9 15.1 0 14 0ZM5 2H7V7L6 6.25L5 7V2ZM14 18H2V2H3V11L6 8.75L9 11V2H14V18Z'
        fill='currentColor'
      />
    </svg>
  );
}
