import { AppProps } from 'next/app';
import Prism from 'prism-react-renderer/prism';
import '../styles/global.css';
import 'nextra-theme-docs/style.css';

// Prism setup
(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');
require('prismjs/components/prism-bash');

function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default CustomApp;
