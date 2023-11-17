import React, { useCallback, useMemo, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";

export type UseDataTableSearch<K extends string> = {
  defaultValue?: string;
  delay?: number;
  searchKeys?: K[] | ((value: string) => string[]);
  paramType?: "single" | "multiple";
};

export const useDataTableSearch = <K extends string = string>(
  props?: UseDataTableSearch<K>
) => {
  const paramType = useMemo(() => {
    return props?.paramType || "single";
  }, [props?.paramType]);

  const [searchValue, setSearchValue] = useState(props?.defaultValue || "");
  const [debouncedSearch] = useDebouncedValue(searchValue, props?.delay || 300);

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    if (props?.searchKeys) {
      const { searchKeys } = props;

      if (paramType === "single") {
        const values: string[] = [];

        const handleMap = (key: string) => {
          values.push(`${key}:${debouncedSearch}`);
        };

        if (searchKeys instanceof Function) {
          searchKeys(debouncedSearch).forEach(handleMap);
        } else {
          searchKeys?.forEach(handleMap);
        }

        params.append("search", values.join(";"));
      } else {
        const handleMap = (key: string) => {
          params.append(key, debouncedSearch);
        };

        if (searchKeys instanceof Function) {
          searchKeys(debouncedSearch).forEach(handleMap);
        } else {
          searchKeys?.forEach(handleMap);
        }
      }
    }
    return params.toString();
    // eslint-disable-next-line
  }, [debouncedSearch, props?.searchKeys, paramType]);

  const searchProps = {
    value: searchValue,
    onChange: onChangeSearch,
  };

  const searchLifecycle = {
    search: debouncedSearch,
  };

  return {
    searchValue,
    debouncedSearch,
    onChangeSearch,
    searchParams,
    searchProps,
    searchLifecycle,
  };
};
