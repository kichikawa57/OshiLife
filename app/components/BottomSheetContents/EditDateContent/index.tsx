import React, { FC, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Picker } from "@react-native-picker/picker";

import { ContentBase } from "../ContentBase";

import { StyledContent, StyledDatePickerWrap } from "./style";

type Props = {
  currentDate: Dayjs;
  onPressCancel: () => void;
  onPressComplete: (date: Dayjs) => void;
};

export const EditDateContent: FC<Props> = ({ currentDate, onPressCancel, onPressComplete }) => {
  const [date, setDate] = useState<Dayjs>(currentDate);

  const currentYear = dayjs().year();
  const years = Array.from({ length: 50 }, (_, index) => currentYear - index);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <ContentBase
      isAbleToScroll={false}
      isFullHeight={false}
      onPressCancel={onPressCancel}
      onPressComplete={() => {
        onPressComplete(date);
      }}
    >
      <StyledContent>
        <StyledDatePickerWrap>
          <Picker
            selectedValue={date.year()}
            style={{
              flex: 1,
            }}
            onValueChange={(value) => {
              setDate(date.year(value));
            }}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year.toString()} value={year} />
            ))}
          </Picker>
          <Picker
            selectedValue={date.month() + 1}
            style={{
              flex: 1,
            }}
            onValueChange={(value) => {
              setDate(date.month(value - 1));
            }}
          >
            {months.map((month) => (
              <Picker.Item key={month} label={month.toString()} value={month} />
            ))}
          </Picker>
        </StyledDatePickerWrap>
      </StyledContent>
    </ContentBase>
  );
};
