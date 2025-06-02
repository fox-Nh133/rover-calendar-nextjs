// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        {/* Google Fonts を読み込み */}
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap"
          rel="stylesheet"
        />
        {/* パフォーマンス改善のための preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
