import { AppProps } from "next/app";

import { Header } from "../componentes/Header";

import "../styles/global.scss";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    // `session` comes from `getServerSideProps` or `getInitialProps`.
    // Avoids flickering/session loading on first load.
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
