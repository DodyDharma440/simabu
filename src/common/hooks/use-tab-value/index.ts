import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDataTabs } from "../use-data-tabs";
import { ITabCardItem } from "../../interfaces/ui";

type UseTabValueOptions = {
  items: ITabCardItem[];
  basePath?: string;
  activeTab?: string;
};

export const useTabValue = ({
  items,
  basePath,
  activeTab,
}: UseTabValueOptions) => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState<string | null>(items[0].id);
  const { tabId, name: tabParamName } = useDataTabs();

  const isWithQuery = useMemo(() => {
    return Boolean(tabId && tabParamName && basePath);
  }, [basePath, tabId, tabParamName]);

  useEffect(() => {
    const handleRoute = () =>
      router.replace(
        `${basePath}?${tabParamName}=${items[0]?.id || ""}`,
        undefined,
        { shallow: true }
      );

    if (isWithQuery) {
      const tabIndex = items.findIndex((tab) => tab.id === tabId);
      const index = tabIndex === -1 ? 0 : tabIndex;
      if (tabIndex === -1) {
        handleRoute();
      }
      setTabValue(items[index].id);
    } else {
      setTabValue(items[0].id);
      if (basePath) {
        handleRoute();
      }
    }
    // eslint-disable-next-line
  }, [isWithQuery]);

  useEffect(() => {
    if (activeTab) {
      setTabValue(activeTab);
    }
  }, [activeTab]);

  return [tabValue, setTabValue] as [typeof tabValue, typeof setTabValue];
};
