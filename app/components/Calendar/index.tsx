import React, { FC, Fragment, memo, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { isHoliday } from "japanese-holidays";

import { nonNullable, sortDates } from "../../shared/utils";
import {
  ScheduleForCalendar,
  Schedules,
  convertScheduleForCalendarToModel,
} from "../../model/schedules";
import { colors } from "../../shared/styles/color";

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
  scheduleData: Schedules[];
  onPressDate: (calendarDate: string, schedules: Schedules[]) => void;
};

type ResultData = {
  date: Dayjs;
  schedules: ScheduleForCalendar[];
};

const CalendarComponent: FC<Props> = ({ scheduleData, currentDate, onPressDate }) => {
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
        const schedulesForTheDay = scheduleData
          // 開始日、終了日を確認する
          .filter((schedule) => {
            const startDate = dayjs(schedule.start_at).format("YYYY-MM-DD");
            const endDate = dayjs(schedule.end_at).format("YYYY-MM-DD");
            return currentDate.isSameOrAfter(startDate) && currentDate.isSameOrBefore(endDate);
          })
          // 該当する日付をまとめる
          .map<ScheduleForCalendar>((schedule) => {
            const weekEndDate = orderedDates[orderedDates.length - 1];

            const startDate = dayjs(schedule.start_at);
            const endDate = dayjs(schedule.end_at);
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
        const calendarDate = orderResult.date.format("YYYY-MM-DD");

        const isCurrent = dayjs(today.format("YYYY-MM-DD")).isSame(calendarDate);
        const isOtherMonth = !(orderResult.date.month() === currentMonth);
        const holiday = isHoliday(orderResult.date.toDate());

        return (
          <Fragment key={`${datesIndex}-${dateIndex}`}>
            {isCurrent && <StyledCalendarContentBg index={dateIndex} />}
            <StyledCalendarEventPanel
              index={dateIndex}
              activeOpacity={1}
              onPress={() => {
                onPressDate(
                  calendarDate,
                  orderResult.schedules.map((schedule) =>
                    convertScheduleForCalendarToModel(schedule),
                  ),
                );
              }}
            />
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
                        backgroundColor={schedule.oshi?.color || colors.primary}
                        isTransparent={schedule.isTransparent}
                        startWeekIndex={schedule.startWeekIndex}
                        endWeekIndex={schedule.endWeekIndex}
                      >
                        {schedule.title}
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
  }, [currentMonth, getMonth, onPressDate, scheduleData, today]);

  return (
    <StyledView>
      <StyledCalendarContentWrap>{calendar}</StyledCalendarContentWrap>
    </StyledView>
  );
};

export const Calendar = memo(CalendarComponent);
