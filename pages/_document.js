import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon - All sizes */}
        <link rel="icon" type="image/png" sizes="32x32" href="/images/case-studies/logo-1.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/case-studies/logo-1.png" />
        <link rel="shortcut icon" href="/images/case-studies/logo-1.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/case-studies/logo-1.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/case-studies/logo-1.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/case-studies/logo-1.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
