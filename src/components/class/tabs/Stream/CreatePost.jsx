// TODO: Rewrite to TS
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Box, Avatar, IconButton, Grid } from '@mui/material';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import { useThemeContext } from 'src/context/ThemeContext';
import Button from 'src/components/common/Button';
import { stringAvatar } from 'src/utils/avatar';
import { useTranslation } from 'next-i18next';
import AddPostFile from 'src/components/class/tabs/Stream/PostsList/Post/PostFiles/AddPostFile';
import PostFile from 'src/components/class/tabs/Stream/PostsList/Post/PostFiles/PostFile';
import { useRouter } from 'next/router';

const validationSchema = Yup.object({
  post: Yup.string().required('Post content is required'),
  files: Yup.array().max(5, 'You can upload up to 5 files'),
});

const CreatePost = ({ onNewPost }) => {
  const themeContext = useThemeContext();
  const router = useRouter();
  const { t } = useTranslation();

  const isAPostBeingEdited = !!router.query.postId;

  return (
    <Box
      sx={theme => ({
        mt: 4,
        p: 2,
        // Find better way to handle border color in different modes
        border: `1px solid ${themeContext.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]}`,
        borderRadius: 1,
      })}
    >
      <Formik
        initialValues={{ post: '', files: [] }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          // Process the form data
          const postData = {
            content: values.post,
            files: values.files, // Pass the files along with the post content
          };
          onNewPost(postData);
          resetForm();
        }}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Avatar
                alt='User'
                src='https://via.placeholder.com/40'
                sx={{ width: 40, height: 40, mr: 2, mt: 2 }}
                {...stringAvatar('Muhammed Aldulaimi')}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Field
                  as={TextField}
                  name='post'
                  multiline
                  minRows={1}
                  fullWidth
                  placeholder={t('classes:stream.createPost.whatsOnYourMind')}
                  variant='outlined'
                  //   error={touched.post && !!errors.post}
                  //   helperText={touched.post && errors.post}
                  sx={{
                    mt: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                  }}
                />
                <Grid container justifyContent='flex-end' sx={{ mt: 5 }} spacing={1}>
                  <Grid item xs={9}>
                    <Grid container spacing={2}>
                      {values.files.map((file, index) => (
                        <Grid item key={index}>
                          <PostFile
                            file={{ local: true, value: file }}
                            onDelete={() => {
                              const newFiles = values.files.filter((_, i) => i !== index);
                              setFieldValue('files', newFiles);
                            }}
                            // progress={50}
                          />
                        </Grid>
                      ))}
                      {!isAPostBeingEdited && (
                        /** There is a weird bug where if `AddPostFile` is being used in multiple
                        places (EG: CreatePost and EditPost), the onChange handler gets called in the
                        wrong component for some reason (in our case, the onChange gets called in
                        CreatePost when it should've been called in EditPost). I didnt have time
                        to investigate. I hotfix it by destroying the component (de-rendering it) when
                        we are editing a post. */
                        <Grid item>
                          <AddPostFile
                            onChange={files => {
                              setFieldValue('files', [...values.files, ...Array.from(files)]);
                            }}
                          />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={3} container>
                    <Grid container justifyContent='flex-end' alignItems='flex-end'>
                      <Grid item>
                        <input
                          accept='image/*,application/pdf'
                          id='file-upload'
                          type='file'
                          multiple
                          hidden
                          onChange={event => {
                            const files = event.currentTarget.files;
                            setFieldValue('files', Array.from(files));
                          }}
                        />
                        <label htmlFor='file-upload'>
                          <IconButton component='span' sx={{ mx: 3 }}>
                            <AttachFileRoundedIcon />
                          </IconButton>
                        </label>
                        <Button
                          type='submit'
                          variant='contained'
                          color='primary'
                          disabled={values.post === ''}
                        >
                          {t('classes:stream.createPost.post')}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreatePost;
