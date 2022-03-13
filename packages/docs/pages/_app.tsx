import { AppProps } from 'next/app';
import Head from 'next/head';
import 'nextra-theme-docs/style.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Headless Stepper</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
