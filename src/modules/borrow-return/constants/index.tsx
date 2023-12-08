import dayjs from "dayjs";
import { BorrowPeriod } from "../interfaces";

export const periodDates: Record<BorrowPeriod, Date> = {
  "3 Hari": dayjs().add(3, "days").toDate(),
  "5 Hari": dayjs().add(5, "days").toDate(),
  "1 Minggu": dayjs().add(7, "days").toDate(),
  "2 Minggu": dayjs().add(14, "days").toDate(),
};

export const periodOptions = Object.keys(periodDates);
