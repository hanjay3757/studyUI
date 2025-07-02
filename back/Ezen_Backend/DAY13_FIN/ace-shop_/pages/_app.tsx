import "@/styles/globals.css";
import type { AppProps } from "next/app";
// pages/_app.tsx
import 'swiper/css';
import 'swiper/css/navigation';
import Layout from "@/components/Layout";
//npm i swiper
export default function App({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>;
}
