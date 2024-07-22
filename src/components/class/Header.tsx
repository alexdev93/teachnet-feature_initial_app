import { useEffect, useRef, useState } from 'react';
import purify from 'dompurify';
import { Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  title: string;
  subtitle: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
}

function useDisableTypographyEditableNewLine(
  ref: React.RefObject<HTMLSpanElement>,
  { onEnterKeyPress }: { onEnterKeyPress?: () => void } = {},
) {
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('keydown', e => {
        //override pressing enter in contenteditable
        const isEnterKeyPressed = e.key === 'Enter' || e.code === 'Enter' || e.keyCode == 13;
        if (isEnterKeyPressed) {
          //don't automatically insert newline
          e.preventDefault();
          e.stopPropagation();
          onEnterKeyPress && onEnterKeyPress();
        }
      });
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.removeEventListener('keydown', () => {});
      }
    };
  }, [ref, onEnterKeyPress]);
}

function setCaretAtEnd(element: HTMLSpanElement) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export default function ClassHeader(props: Props) {
  const { title, subtitle, onTitleChange, onSubtitleChange } = props;

  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);

  const handleTitleEditClick = () => {
    setIsEditingTitle(true);
  };

  const handleSubtitleEditClick = () => {
    setIsEditingSubtitle(true);
  };

  const handleTitleSaveClick = () => {
    setIsEditingTitle(false);
  };

  const handleSubtitleSaveClick = () => {
    setIsEditingSubtitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLSpanElement>) => {
    setIsEditingTitle(false);
    onTitleChange(purify.sanitize(e.target.innerText));
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLSpanElement>) => {
    setIsEditingSubtitle(false);
    onSubtitleChange(purify.sanitize(e.target.innerText));
  };

  useDisableTypographyEditableNewLine(titleRef, {
    onEnterKeyPress: () => {
      setIsEditingTitle(false);
      onTitleChange(purify.sanitize(titleRef.current?.innerText as string));
    },
  });
  useDisableTypographyEditableNewLine(subtitleRef, {
    onEnterKeyPress: () => {
      setIsEditingSubtitle(false);
      onSubtitleChange(purify.sanitize(subtitleRef.current?.innerText as string));
    },
  });

  useEffect(() => {
    if (isEditingTitle && titleRef.current) {
      titleRef.current.focus();
      setCaretAtEnd(titleRef.current);
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (isEditingSubtitle && subtitleRef.current) {
      subtitleRef.current.focus();
      setCaretAtEnd(subtitleRef.current);
    }
  }, [isEditingSubtitle]);

  return (
    <Box maxWidth='100%'>
      <Box display='flex' alignItems='center'>
        <Typography
          variant='h4'
          gutterBottom
          fontWeight={600}
          contentEditable={isEditingTitle}
          suppressContentEditableWarning
          onBlur={handleTitleChange}
          sx={{
            '&:hover': { outline: 'none' },
            '&:focus': { outline: 'none' },
            whiteSpace: 'pre',
            borderBottom: isEditingTitle ? '1px solid' : 'none',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            cursor: isEditingTitle ? 'text' : 'default',
          }}
          ref={titleRef}
        >
          {title}
        </Typography>
        <IconButton onClick={isEditingTitle ? handleTitleSaveClick : handleTitleEditClick}>
          {isEditingTitle ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Box>
      <Box display='flex' alignItems='center'>
        <Typography
          variant='subtitle1'
          gutterBottom
          contentEditable={isEditingSubtitle}
          suppressContentEditableWarning
          onBlur={handleSubtitleChange}
          sx={{
            '&:hover': { outline: 'none' },
            '&:focus': { outline: 'none' },
            borderBottom: isEditingSubtitle ? '1px solid' : 'none',
            cursor: isEditingSubtitle ? 'text' : 'default',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
          ref={subtitleRef}
        >
          {subtitle}
        </Typography>
        <IconButton onClick={isEditingSubtitle ? handleSubtitleSaveClick : handleSubtitleEditClick}>
          {isEditingSubtitle ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Box>
    </Box>
  );
}
