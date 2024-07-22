import React, { useState } from 'react';
import {
  Button as MUIButton,
  Menu as MUIMenu,
  MenuItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'tr', name: 'TR' },
  // Add more languages as needed
];

const Button = styled(MUIButton)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 8,
  fontWeight: theme.typography.fontWeightBold,
  // on hover
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const Menu = styled(MUIMenu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 8,
    width: '65px',
    '& span': {
      textAlign: 'center',
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.primary,
      fontSize: '0.875rem',
    },
  },
}));

const LanguageSelect: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    router.push(router.asPath, undefined, { locale: languageCode });

    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls='language-menu'
        aria-haspopup='true'
        onClick={handleClick}
        sx={{ color: theme.palette.text.primary }}
      >
        {languages.find(lang => lang.code === i18n.language)?.name || 'Select Language'}
      </Button>
      <Menu id='language-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map(language => (
          <MenuItem
            key={language.code}
            selected={language.code === i18n.language}
            onClick={() => handleLanguageChange(language.code)}
          >
            <ListItemText>{language.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSelect;
