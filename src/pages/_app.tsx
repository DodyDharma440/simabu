import { AppProps } from "next/app";
import Head from "next/head";
import { AppProvider, ThemeProvider } from "@/common/providers";
import { customTheme } from "@/common/configs/theme";
import { AdminLayout } from "@/common/layouts";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>SIMABU</title>
      </Head>

      <ThemeProvider colorKey="simabu" theme={customTheme}>
        <AppProvider>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </AppProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
