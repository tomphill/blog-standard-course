import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { DM_Sans, DM_Serif_Display } from '@next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const dmSans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
});

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <UserProvider>
      <main
        className={`${dmSans.variable} ${dmSerifDisplay.variable} font-body`}
      >
        {getLayout(<Component {...pageProps} />, pageProps)}
      </main>
    </UserProvider>
  );
}

export default MyApp;
