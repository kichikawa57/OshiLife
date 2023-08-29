import React, { FC, Fragment, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { isHoliday } from "japanese-holidays";

import { nonNullable, sortDates } from "../../shared/utils";

import {
  StyledCalendarBorder,
  StyledCalendarContent,
  StyledCalendarContentBg,
  StyledCalendarContentInner,
  StyledCalendarContentWrap,
  StyledCalendarEventPanel,
  StyledCalendarWeek,
  StyledScheduleDetail,
  StyledText,
  StyledTextWrap,
  StyledView,
} from "./style";
import { useCalendar } from "./hooks";

type Props = {
  currentDate: Dayjs;
  onPressDate: () => void;
};

type ScheduleData = {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  createDate: string;
};

type ResultScheduleData = ScheduleData & {
  isTransparent: boolean;
  startWeekIndex: number;
  endWeekIndex: number;
};

type ResultData = {
  date: Dayjs;
  schedules: ResultScheduleData[];
};

const dummyData: ScheduleData[] = [
  {
    id: "schedule-001",
    startDate: "2023-07-31 10:30:00",
    endDate: "2023-07-31 10:30:00",
    title: "スケジュール 00",
    createDate: "2023-01-02 10:30:00",
  },
  {
    id: "schedule-002",
    startDate: "2023-08-01 10:30:00",
    endDate: "2023-08-02 10:30:00",
    title: "スケジュール 01",
    createDate: "2023-01-01 10:30:00",
  },
  {
    id: "schedule-003",
    startDate: "2023-08-01 10:30:00",
    endDate: "2023-08-03 10:30:00",
    title: "スケジュール 02",
    createDate: "2022-01-02 10:30:00",
  },
  {
    id: "schedule-004",
    startDate: "2023-08-02 10:30:00",
    endDate: "2023-08-12 10:30:00",
    title: "スケジュール 03",
    createDate: "2022-01-02 10:30:00",
  },
  {
    id: "schedule-005",
    startDate: "2023-08-01 10:30:00",
    endDate: "2023-09-12 10:30:00",
    title: "スケジュール 04",
    createDate: "2022-01-02 10:30:00",
  },
];

export const Calendar: FC<Props> = ({ currentDate, onPressDate }) => {
  const currentMonth = currentDate.month();
  const today = dayjs();
  const { getMonth } = useCalendar(currentDate);

  const calendar = useMemo(() => {
    const months = getMonth();

    return months.map((dates, datesIndex) => {
      const orderedDates = sortDates(dates);

      // カレンダーの形を変形したデータ
      const results: ResultData[] = [];

      // 取得した日付データを開始日、終了日を確認して
      // 該当する日付のデータを日付毎にまとめる
      orderedDates.forEach((currentDate, currentDateIndex) => {
        const schedulesForTheDay = dummyData
          // 開始日、終了日を確認する
          .filter((schedule) => {
            const startDate = dayjs(schedule.startDate).format("YYYY-MM-DD");
            const endDate = dayjs(schedule.endDate).format("YYYY-MM-DD");
            return currentDate.isSameOrAfter(startDate) && currentDate.isSameOrBefore(endDate);
          })
          // 該当する日付をまとめる
          .map<ResultScheduleData>((schedule) => {
            const weekEndDate = orderedDates[orderedDates.length - 1];

            const startDate = dayjs(schedule.startDate);
            const endDate = dayjs(schedule.endDate);
            const startDateYmd = startDate.format("YYYY-MM-DD");

            // 開始日と週の初めのみ表示
            const isTransparent = !(currentDate.isSame(startDateYmd) || currentDateIndex === 0);
            // 週の最終日がスケジュールの期間中か確認
            const isDurringSchedule = weekEndDate.isSameOrBefore(endDate);

            return {
              ...schedule,
              isTransparent,
              startWeekIndex: currentDateIndex !== 0 ? startDate.day() : 0,
              endWeekIndex: isDurringSchedule ? 6 : endDate.day(),
            };
          });

        results.push({
          date: currentDate,
          schedules: schedulesForTheDay,
        });
      });

      // 前日の日付を確認して表示する位置を修正
      const orderResults = results.map<ResultData>((result, resultIndex) => {
        const previousResult = resultIndex !== 0 ? results[resultIndex - 1] : null;

        if (!previousResult) return result;

        // 前日に同じ内容のデータがあるのだけ抽出
        const mappingDates = result.schedules
          .map((schedule) => {
            const findIndex = previousResult.schedules.findIndex(
              (previousResultSchedule) => previousResultSchedule.id === schedule.id,
            );

            if (findIndex === -1) return null;

            return {
              schedule,
              index: findIndex,
            };
          })
          .filter(nonNullable);

        if (mappingDates.length === 0) return result;

        // 前日に無い内容のデータだけ抽出
        const schedulesWithoutPreviousSchedules = result.schedules.filter((schedule) => {
          return !mappingDates.map((mappingDate) => mappingDate.schedule.id).includes(schedule.id);
        });

        // 前日のデータを割り込ませる
        for (const mappingDate of mappingDates) {
          schedulesWithoutPreviousSchedules.splice(mappingDate.index, 0, mappingDate.schedule);
        }

        result.schedules = schedulesWithoutPreviousSchedules;

        return result;
      });
      const week = orderResults.map((orderResult, dateIndex) => {
        const isCurrent = dayjs(today.format("YYYY-MM-DD")).isSame(
          orderResult.date.format("YYYY-MM-DD"),
        );
        const isOtherMonth = !(orderResult.date.month() === currentMonth);
        const holiday = isHoliday(orderResult.date.toDate());

        return (
          <Fragment key={`${datesIndex}-${dateIndex}`}>
            {isCurrent && <StyledCalendarContentBg index={dateIndex} />}
            <StyledCalendarEventPanel index={dateIndex} activeOpacity={1} onPress={onPressDate} />
            <StyledCalendarContent>
              <StyledCalendarContentInner>
                <StyledTextWrap>
                  <StyledText
                    isCurrent={isCurrent}
                    isOtherMonth={isOtherMonth}
                    isSaturday={orderResult.date.day() === 6}
                    isSunday={orderResult.date.day() === 0}
                    isHoliday={!!holiday}
                  >
                    {orderResult.date.format("D")}
                  </StyledText>
                </StyledTextWrap>
                {orderResult.schedules.map((schedule, scheduleIndex) => {
                  return (
                    scheduleIndex <= 2 && (
                      <StyledScheduleDetail
                        key={`${datesIndex}-${dateIndex}-${scheduleIndex}`}
                        numberOfLines={1}
                        isTransparent={schedule.isTransparent}
                        startWeekIndex={schedule.startWeekIndex}
                        endWeekIndex={schedule.endWeekIndex}
                      >
                        予定ありsssssss
                      </StyledScheduleDetail>
                    )
                  );
                })}
              </StyledCalendarContentInner>
            </StyledCalendarContent>
          </Fragment>
        );
      });

      return (
        <StyledCalendarWeek key={`weeks-${datesIndex}`} isFirstWeek={datesIndex === 0}>
          {Array.from({ length: 6 }).map((_, index) => (
            <StyledCalendarBorder key={`border-${index}`} index={index} />
          ))}
          {week}
        </StyledCalendarWeek>
      );
    });
  }, [currentMonth, getMonth, onPressDate, today]);

  return (
    <StyledView>
      <StyledCalendarContentWrap>{calendar}</StyledCalendarContentWrap>
    </StyledView>
  );
};
