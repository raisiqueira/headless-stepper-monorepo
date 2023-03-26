import { AppProps } from 'next/app';
import '../styles/global.css';
import 'nextra-theme-docs/style.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
