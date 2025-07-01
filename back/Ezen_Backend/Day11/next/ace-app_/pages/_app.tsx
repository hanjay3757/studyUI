import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";


//React App.tsx 컴포넌트와 동일
export default function App({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>;
}
