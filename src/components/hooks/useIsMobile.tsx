import { useMediaQuery } from '@mui/material';

export default function useIsMobile() {
  const isMobile = useMediaQuery('(max-width:700px)');

  return isMobile;
}
