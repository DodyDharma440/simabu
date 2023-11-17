import { createContext } from "react";

type TabsCtx = {
  tabId: string;
  name: string;
};

export const TabsContext = createContext<TabsCtx>({ tabId: "", name: "" });

type TabsProviderProps = {
  children: React.ReactNode;
  tabId: string;
  name?: string;
};

export const TabsProvider: React.FC<TabsProviderProps> = ({
  children,
  tabId,
  name,
}) => {
  return (
    <TabsContext.Provider value={{ tabId, name: name || "tab" }}>
      {children}
    </TabsContext.Provider>
  );
};
