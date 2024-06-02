import React, { FC, Fragment, memo, useMemo } from "react";
import { Text } from "@rneui/base";
import { TouchableOpacity, View } from "react-native";

import { getTextStyle } from "../../shared/utils";
import {
  ScheduleResult,
  Schedules,
  convertScheduleForCalendarToModel,
} from "../../model/schedules";
import { colors, dateColors } from "../../shared/styles/color";
import { OshiId } from "../../model/oshis";

type Props = {
  scheduleData: ScheduleResult;
  displayedOshis: OshiId[] | null;
  onPressDate: (calendarDate: string, schedules: Schedules[]) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

const selectColor = ({
  isCurrent,
  isOtherMonth,
  isSunday,
  isSaturday,
  isHoliday,
}: {
  isCurrent: boolean;
  isOtherMonth: boolean;
  isSunday: boolean;
  isSaturday: boolean;
  isHoliday: boolean;
}) => {
  if (isOtherMonth) return colors.textDarkSecondary;
  if (isSunday) return dateColors.sunday;
  if (isSaturday) return dateColors.saturday;
  if (isHoliday) return dateColors.holiday;
  if (isCurrent) return colors.textDark;

  return colors.textDark;
};

const CalendarComponent: FC<Props> = ({ scheduleData, displayedOshis, onPressDate }) => {
  const currentMonth = scheduleData.month;

  const calendar = useMemo(() => {
    return scheduleData.data.map((weekData, datesIndex) => {
      const week = weekData.map((dayData, dateIndex) => {
        return (
          <Fragment key={`${datesIndex}-${dateIndex}`}>
            {!dayData.isOtherMonth && dayData.isToday && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${14.2857 * dateIndex}%`,
                  zIndex: 1,
                  width: "14.2857%",
                  height: "100%",
                  borderColor: colors.primary,
                  borderWidth: 2,
                  borderStyle: "solid",
                }}
              />
            )}
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 0,
                left: `${14.2857 * dateIndex}%`,
                zIndex: 3,
                width: "14.2857%",
                height: "100%",
                opacity: 0,
              }}
              activeOpacity={1}
              onPress={() => {
                onPressDate(
                  dayData.dateFormat,
                  dayData.schedules.map((schedule) => convertScheduleForCalendarToModel(schedule)),
                );
              }}
            />
            <View
              style={{
                position: "relative",
                zIndex: 2,
                width: "14.2857%",
              }}
            >
              <View
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  paddingTop: 5,
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Text
                    style={{
                      color: selectColor({
                        isOtherMonth: dayData.isOtherMonth,
                        isCurrent: dayData.isToday && !dayData.isOtherMonth,
                        isSaturday: dayData.isSaturday,
                        isSunday: dayData.isSunday,
                        isHoliday: !!dayData.holiday,
                      }),
                      fontSize: 14,
                    }}
                  >
                    {dayData.day}
                  </Text>
                </View>
                {dayData.schedules.map((schedule, scheduleIndex) => {
                  if (
                    displayedOshis &&
                    !displayedOshis.some((oshiId) => oshiId === schedule.oshi_id)
                  )
                    return null;

                  return (
                    scheduleIndex <= 2 && (
                      <Text
                        key={`${datesIndex}-${dateIndex}-${scheduleIndex}`}
                        style={{
                          width: `${
                            (schedule.isTransparent
                              ? 98
                              : schedule.endWeekIndex + 1 - schedule.startWeekIndex) * 98
                          }%`,
                          marginTop: 4,
                          overflow: "hidden",
                          fontSize: 12,
                          backgroundColor: schedule.oshi?.color || colors.primary,
                          opacity: schedule.isTransparent ? 0 : 1,
                          color: getTextStyle(schedule.oshi?.color || colors.primary),
                        }}
                        numberOfLines={1}
                      >
                        {schedule.title}
                      </Text>
                    )
                  );
                })}
              </View>
            </View>
          </Fragment>
        );
      });

      return (
        <View
          key={`weeks-${datesIndex}`}
          style={{
            position: "relative",
            flexDirection: "row",
            width: "100%",
            borderBottomColor: colors.borderDarkSecondary,
            borderBottomWidth: 1,
            borderTopColor: datesIndex === 0 ? colors.borderDarkSecondary : "#fff",
            borderTopWidth: datesIndex === 0 ? 1 : 0,
          }}
        >
          {week}
          {Array.from({ length: 6 }).map((_, index) => (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: `${14.2857 * (index + 1)}%`,
                zIndex: 0,
                width: 1,
                height: "100%",
                backgroundColor: colors.borderDarkSecondary,
              }}
              key={`border-${index}`}
            />
          ))}
        </View>
      );
    });
  }, [displayedOshis, onPressDate, scheduleData.data]);

  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 20,
          paddingTop: 20,
        }}
      >
        {`${scheduleData.year}年${currentMonth + 1}月`}
      </Text>
      <View
        style={{
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {calendar}
      </View>
    </View>
  );
};

export const Calendar = memo(CalendarComponent, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.scheduleData) === JSON.stringify(nextProps.scheduleData) &&
    arraysEqual(prevProps.displayedOshis ?? [], nextProps.displayedOshis ?? [])
  );
});
