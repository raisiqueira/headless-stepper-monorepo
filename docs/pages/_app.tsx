import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import '../styles/global.css';
import 'nextra-theme-docs/style.css';
import nextSeoConfig from '../nextSeo.config';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...nextSeoConfig} />
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
