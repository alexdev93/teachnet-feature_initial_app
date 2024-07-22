import React from 'react';
import { Box, DialogActions, DialogContent, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Formik, Form, Field } from 'formik';
import PostAuthor from 'src/components/class/tabs/Stream/PostsList/Post/PostAuthor';
import { Post as PostProp } from 'src/components/class/tabs/Stream/PostsList/Post/types';
import Button from 'src/components/common/Button';
import EditPostText from 'src/modals/EditPost/EditPostText';
import useModalStore from 'src/store/modal';
import PostFile, {
  PostFileProps,
  RemotePostFile,
} from 'src/components/class/tabs/Stream/PostsList/Post/PostFiles/PostFile';
import AddPostFile from 'src/components/class/tabs/Stream/PostsList/Post/PostFiles/AddPostFile';
import { removeQueryParam } from 'src/utils/queryParams';
import { useRouter } from 'next/router';

const POST: PostProp = {
  id: 'asdsad',
  user: {
    id: 'asdasd',
    fullName: 'Muhammed Aldulaimi',
    role: 'teacher',
    avatar:
      'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  content: 'Hello students! This is my first post!',
  date: new Date('2022-02-02'),
  files: [
    {
      local: false,
      type: 'jpeg',
      name: 'hey',
      url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      local: false,
      type: 'pdf',
      name: 'hey',
      url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      local: false,
      type: 'webm',
      name: 'Webm Video Important asdasdadsads',
      url: 'https://images.unsplash.com/photo-1716881139357-ddcb2f52940c?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ],
  comments: [],
  edited: false,
};

interface Props {
  post: PostProp;
  onClose: () => void;
}

interface FormValues {
  text: string;
  files: PostFileProps[];
  filesToDelete: PostFileProps[];
}

export default function EditPostModal(props: Props) {
  const { onClose } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const closeModal = useModalStore(state => state.closeModal);

  const post = POST;

  const handleCloseModal = () => {
    closeModal();
    removeQueryParam(router, 'postId');
    onClose && onClose();
  };

  const initialValues: FormValues = {
    text: post.content,
    files: post.files.map(
      file =>
        ({
          local: false,
          // @ts-ignore
          url: file.url,
          // @ts-ignore
          type: file.type,
          // @ts-ignore
          name: file.name,
        }) as RemotePostFile,
    ),
    filesToDelete: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        console.log('Form Values:', values);
        // Handle form submission logic
        setSubmitting(false);
        // closeModal();
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <DialogContent>
            <PostAuthor post={post} />
            <Field
              component={EditPostText}
              name='text'
              text={values.text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('text', e.target.value)
              }
            />
            <Box mt={2}>
              <Grid container spacing={2}>
                {values.files.map((file, index) => (
                  <Grid item key={index}>
                    <PostFile
                      file={file}
                      onDelete={(file: PostFileProps) => {
                        if (file.local) {
                          setFieldValue(
                            'files',
                            values.files.filter(f => f !== file),
                          );
                        } else {
                          setFieldValue('filesToDelete', [...values.filesToDelete, file]);
                          setFieldValue(
                            'files',
                            values.files.filter(f => f !== file),
                          );
                        }
                      }}
                    />
                  </Grid>
                ))}
                <Grid item>
                  <AddPostFile
                    onChange={files => {
                      const newFiles = Array.from(files).map(file => ({
                        local: true,
                        value: file,
                      }));
                      console.info('New Files:', newFiles);
                      setFieldValue('files', [...values.files, ...newFiles]);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color='secondary' variant='contained'>
              {t('common:close')}
            </Button>
            <Button type='submit' color='primary' variant='contained' disabled={isSubmitting}>
              {t('common:edit')}
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
}
