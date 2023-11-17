import dayjs from "dayjs";
import { DateRangeValue } from "../interfaces/ui";

export const formatRangeParams = (
  rangeValue: DateRangeValue | null,
  name?: Partial<Record<"start" | "end", string>>
) => {
  const startName = name?.start || "start";
  const endName = name?.end || "end";

  const formatEndDay = (date: Date) => {
    return dayjs(date).add(23, "hours").add(59, "minutes");
  };

  if (rangeValue) {
    const urlParams = new URLSearchParams();
    const { value } = rangeValue;
    const [start, end] = value;
    if (!start) {
      return "";
    }
    urlParams.append(startName, start.toISOString());

    if (!end) {
      urlParams.append(endName, formatEndDay(start).toISOString());
      return `&${urlParams.toString()}`;
    }
    urlParams.append(endName, formatEndDay(end).toISOString());

    return `&${urlParams.toString()}`;
  }
  return "";
};

export const parseDateRange = (range: any) => {
  const formatDate = (date: string | null) => {
    return date ? new Date(date) : null;
  };

  const rangeData = {
    ...range,
    value: [formatDate(range?.value?.[0]), formatDate(range?.value?.[1])],
  };

  return rangeData;
};

export const excelDateFormat = (value: number, format: string) => {
  return dayjs(new Date(Math.round((value - 25569) * 86400 * 1000))).format(
    format
  );
};
