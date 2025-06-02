import 'bulma/css/bulma.min.css';
/* global.css */
/* v0.0.2 - updated Zen Maru Gothic font */
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;