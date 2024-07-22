import React, { useCallback } from 'react';
import { Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';
import { useFormikContext } from 'formik';
import { UploadedFile } from 'src/types/assessments/quizzes';

const FileUpload: React.FC = () => {
  const { values, setFieldValue } = useFormikContext<{ uploadedFiles: UploadedFile[] }>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, { id: Math.random().toString(36).substr(2, 9) }),
      );
      setFieldValue('uploadedFiles', [...values.uploadedFiles, ...newFiles]);
    },
    [setFieldValue, values.uploadedFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = (id: string) => {
    setFieldValue(
      'uploadedFiles',
      values.uploadedFiles.filter(file => file.id !== id),
    );
  };

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #cccccc',
          borderRadius: '4px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          marginTop: '10px',
          backgroundColor: isDragActive ? '#e1f5fe' : 'transparent',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </Box>
      {values.uploadedFiles.length > 0 && (
        <List>
          {values.uploadedFiles.map(file => (
            <ListItem key={file.id}>
              <ListItemText primary={file.name} secondary={`${file.size} bytes`} />
              <IconButton edge='end' aria-label='delete' onClick={() => handleRemoveFile(file.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default FileUpload;
