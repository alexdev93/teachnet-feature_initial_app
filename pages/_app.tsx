import Head from 'next/head';
import { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProvider } from 'src/context/ThemeContext';
import { appWithTranslation } from 'next-i18next';
import ModalFactory from 'src/modals/ModalsFactory';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeContextProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
        <ModalFactory />
      </ThemeContextProvider>
    </AppCacheProvider>
  );
}

export default appWithTranslation(MyApp);
