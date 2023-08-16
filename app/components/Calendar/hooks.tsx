import dayjs, { Dayjs } from "dayjs";
import { useCallback } from "react";

export const useCalendar = (date: Dayjs) => {
  // 与えられた月の日付を2次元配列で取得する関数
  const getMonth = useCallback(() => {
    const year = date.year();
    const month = date.month();

    // 月の初めの日の曜日を取得
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    // 指定された月の日数を取得
    const daysInMonth = dayjs(new Date(year, month)).daysInMonth();

    // カウンターの初期化
    let currentMonthCount = 0 - firstDayOfTheMonth;
    // 必要な週の数を計算
    const numberOfRows = Math.ceil((firstDayOfTheMonth + daysInMonth) / 7);
    // 日付の2次元配列を作成
    const daysMatrix = Array.from({ length: numberOfRows }).map(() => {
      return Array.from({ length: 7 }).map(() => {
        currentMonthCount++;
        return dayjs(new Date(year, month, currentMonthCount));
      });
    });

    return daysMatrix;
  }, [date]);

  return { getMonth };
};
