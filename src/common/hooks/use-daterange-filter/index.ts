import { useCallback, useEffect, useMemo, useState } from "react";
import { useDidUpdate } from "@mantine/hooks";
import { formatRangeParams, parseDateRange } from "../../utils/dates";
import { DateRangeValue } from "../../interfaces/ui";

export const useDateRangeFilter = (
  defaultValue?: DateRangeValue,
  persistKey?: string
) => {
  const [rangeValue, setRangeValue] = useState<DateRangeValue | null>(
    defaultValue || null
  );
  const [isReady, setIsReady] = useState(false);

  const handleSetLocalStorage = useCallback(() => {
    if (persistKey) {
      const formatValue = (date?: Date | null) => {
        return date ? date.toISOString() : null;
      };

      const formatDateRange = (dateRange: DateRangeValue | null) => {
        if (dateRange) {
          return {
            ...dateRange,
            value: [
              formatValue(dateRange?.value[0]),
              formatValue(dateRange?.value[1]),
            ],
          };
        }
        return "all-dates";
      };

      localStorage.setItem(
        persistKey,
        JSON.stringify(formatDateRange(rangeValue))
      );
    }
  }, [persistKey, rangeValue]);

  const dateRangeParams = useMemo(() => {
    return formatRangeParams(rangeValue);
  }, [rangeValue]);

  useDidUpdate(() => {
    handleSetLocalStorage();
  }, [handleSetLocalStorage]);

  useEffect(() => {
    if (persistKey) {
      const lsDefaultValue = JSON.parse(
        localStorage.getItem(persistKey) || "null"
      ) as
        | {
            label: string;
            value: Array<string | null>;
          }
        | "all-dates"
        | null;

      if (lsDefaultValue) {
        if (lsDefaultValue === "all-dates") {
          setRangeValue(null);
        } else {
          setRangeValue(parseDateRange(lsDefaultValue));
        }
      }
    }
    setIsReady(true);
  }, [persistKey, setRangeValue]);

  return { rangeValue, setRangeValue, dateRangeParams, isReady };
};
