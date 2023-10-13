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

export const getCalendarBounds = (date: Dayjs) => {
  // 渡された月の1日目を取得
  const startOfMonth = date.startOf("month");

  // 渡された月の最後の日を取得
  const endOfMonth = date.endOf("month");

  // カレンダー表示の最初の日付を取得（前の月の最後の週の日曜日）
  const startOfCalendar = startOfMonth.startOf("week");

  // カレンダー表示の最後の日付を取得（次の月の最初の週の土曜日）
  const endOfCalendar = endOfMonth.endOf("week");

  return {
    start: startOfCalendar.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    end: endOfCalendar.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
  };
};

export const getDayRange = (date: Dayjs) => {
  const startOfDay = date.startOf("day").format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  const endOfDay = date.endOf("day").format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  return { startOfDay, endOfDay };
};
