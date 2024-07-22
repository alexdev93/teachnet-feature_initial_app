import { useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DefaultLayout from 'src/layouts/DefaultLayout';
import { GetServerSideProps } from 'next';
import ClassHeader from 'src/components/class/Header';
import ClassBody from 'src/components/class/Body';

const ClassPage: React.FC = () => {
  const [title, setTitle] = useState('UI/UX Design');
  const [subtitle, setSubtitle] = useState('Becoming very good at UI/UX');

  return (
    <DefaultLayout>
      <ClassHeader
        title={title}
        subtitle={subtitle}
        onTitleChange={title => {
          console.info('title: ', title);
          setTitle(title);
        }}
        onSubtitleChange={subtitle => {
          console.info('subtitle: ', subtitle);
          setSubtitle(subtitle);
        }}
      />
      <ClassBody />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { locale } = context;

  // Check for "tab" query parameter
  const tab = context.query.tab;

  if (!tab) {
    // Redirect to the first tab
    return {
      redirect: {
        destination: `/classes/${context?.params?.id}?tab=stream`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'classes',
        'assignments',
        'groups',
      ])),
    },
  };
};

export default ClassPage;
