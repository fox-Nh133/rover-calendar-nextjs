import 'bulma/css/bulma.min.css';
import '../styles/globals.css'; // 必要に応じて
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
