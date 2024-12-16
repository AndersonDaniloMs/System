import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { SelectedProductsProvider } from "@/Hooks/SelectProdutsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SelectedProductsProvider >
      <Component {...pageProps} />
    </SelectedProductsProvider>
  );
}
