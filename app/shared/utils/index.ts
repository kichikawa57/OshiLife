import { Dayjs } from "dayjs";

export const nonNullable = <T>(value: T): value is NonNullable<T> => value != null;

export const objectKeys = <T extends { [key: string]: unknown }>(obj: T): (keyof T)[] => {
  return Object.keys(obj);
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getMinutes = (ms: number) => {
  return 1000 * 60 * ms;
};

export const getDay = (day: number) => {
  return 1000 * 60 * 60 * 24 * day;
};

// asc: ['2023-01-20', '2023-02-05', '2023-03-15']
// desc: ['2023-03-15', '2023-02-05', '2023-01-20']
export const sortDates = (dates: Dayjs[], order: "asc" | "desc" = "asc") => {
  return dates.sort((a, b) => {
    if (order === "asc") {
      // 昇順
      return a.isBefore(b) ? -1 : a.isAfter(b) ? 1 : 0;
    } else if (order === "desc") {
      // 降順
      return a.isAfter(b) ? -1 : a.isBefore(b) ? 1 : 0;
    } else {
      throw new Error("Invalid order. Use 'asc' or 'desc'.");
    }
  });
};
