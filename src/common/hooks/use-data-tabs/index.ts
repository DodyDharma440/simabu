import { useContext } from "react";
import { TabsContext } from "../../contexts";

export const useDataTabs = () => useContext(TabsContext);
