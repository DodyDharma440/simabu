import { AppProps } from "next/app";
import Head from "next/head";
import { AppProvider, ThemeProvider } from "@/common/providers";
import { customTheme } from "@/common/configs/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>SIMABU</title>
      </Head>

      <ThemeProvider colorKey="akundes" theme={customTheme}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
