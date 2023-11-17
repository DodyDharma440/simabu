import * as React from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useMantineColorScheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useHotkeys } from "@mantine/hooks";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "dayjs/locale/id";

dayjs.extend(RelativeTime);
dayjs.extend(weekday);
dayjs.extend(isSameOrBefore);
dayjs.locale("id");

const ToggleColor = () => {
  const { toggleColorScheme } = useMantineColorScheme();

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return null;
};

const NProgress = () => {
  const router = useRouter();

  React.useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && nprogress.start();
    const handleComplete = () => nprogress.complete();

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath, router.events]);

  return <NavigationProgress autoReset />;
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const queryClient = React.useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NProgress />
      <ToggleColor />
      <Notifications position="top-right" />
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default AppProvider;
