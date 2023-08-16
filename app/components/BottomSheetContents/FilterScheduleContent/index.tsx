import React, { FC } from "react";

import { ContentBase } from "../ContentBase";
import { CheckBoxGroup } from "../../CheckBox/Group";
import { CheckBoxItem } from "../../CheckBox/Item";
import { TabList } from "../../Tab/List";

import { StyledContent } from "./style";

type Props = {
  dateType: number;
  calendarType: number;
  setDateType: (index: number) => void;
  setCalendarType: (index: number) => void;
  onPressCancel: () => void;
};

export const FilterScheduleContent: FC<Props> = ({
  dateType,
  calendarType,
  setDateType,
  setCalendarType,
  onPressCancel,
}) => {
  return (
    <ContentBase onPressCancel={onPressCancel} headerPosition="right">
      <StyledContent>
        <TabList list={["日", "週", "月"]} value={dateType} onClick={setDateType} />
      </StyledContent>
      <StyledContent>
        <CheckBoxGroup>
          <CheckBoxItem
            imageUrl="testr"
            isSelected
            name="川村和馬"
            onPress={() => null}
            isMarginRight
          />
          <CheckBoxItem imageUrl="testr" isSelected name="吉野北斗" onPress={() => null} />
        </CheckBoxGroup>
      </StyledContent>
      <StyledContent>
        <TabList
          list={["all", "自分の"]}
          value={calendarType}
          onClick={setCalendarType}
          type="panel"
        />
      </StyledContent>
    </ContentBase>
  );
};
