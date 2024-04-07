import dayjs, { Dayjs } from "dayjs";

import { colors } from "../styles/color";
import { yyyymmddhhmmssForApi } from "../constants/date/dayJs";

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
    start: startOfCalendar.format(yyyymmddhhmmssForApi),
    end: endOfCalendar.format(yyyymmddhhmmssForApi),
  };
};

export const getDayRange = (date: Dayjs) => {
  const startOfDay = date.startOf("day").format(yyyymmddhhmmssForApi);
  const endOfDay = date.endOf("day").format(yyyymmddhhmmssForApi);

  return { startOfDay, endOfDay };
};

/**
 * HexをRGBに変換する
 */
const convertHexToRGB = (hex: string) => {
  if (hex.slice(0, 1) !== "#") {
    throw new Error("Hex must start with #");
  }
  if (hex.length !== 4 && hex.length !== 7) {
    throw new Error("Hex must be 4 or 7 characters");
  }

  const hex6Digits =
    hex.length == 4
      ? "#" +
        hex.slice(1, 2) +
        hex.slice(1, 2) +
        hex.slice(2, 3) +
        hex.slice(2, 3) +
        hex.slice(3, 4) +
        hex.slice(3, 4)
      : hex;

  return [hex6Digits.slice(1, 3), hex6Digits.slice(3, 5), hex6Digits.slice(5, 7)].map((color) =>
    parseInt(color, 16),
  );
};

/**
 * return the text color style that matches the background color you provided.
 */
export const getTextStyle = (backgroundColor: string) => {
  const [red, green, blue] = convertHexToRGB(backgroundColor);

  if (red < 118 && green < 118 && blue < 118) {
    return colors.textLight;
  }
  return colors.textDark;
};

/**
 * can get the date 1 year ago and 1 year later from the date you provided.
 */
export const getDateOneYearAgoAndOneYearLater = (date: string | Dayjs) => {
  const now = dayjs(date);

  const oneYearAgo = now.subtract(1, "year");
  const oneYearLater = now.add(1, "year");

  // const oneYearAgo = now.subtract(1, "month");
  // const oneYearLater = now.add(2, "month");

  return {
    oneYearAgo: oneYearAgo.format(yyyymmddhhmmssForApi),
    oneYearLater: oneYearLater.format(yyyymmddhhmmssForApi),
  };
};
