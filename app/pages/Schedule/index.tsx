import React, { FC, useState } from "react";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfSchedule } from "../../router/app/Schedule/types";
import { CheckBoxItem } from "../../components/CheckBox/Item";
import { CheckBoxGroup } from "../../components/CheckBox/Group";
import { TabList } from "../../components/Tab/List";
import { TabView } from "../../components/Tab/View";
import { TabItem } from "../../components/Tab/View/Item";
import { Calendar } from "../../components/Calendar";
import { StyledTabPanel } from "../../components/Tab/List/style";

import { StyledCheckBox, StyledContent, StyledTabView, StyledWrap } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"top">;
};

export const Schedule: FC<Props> = () => {
  const [dateType, setDateType] = useState(0);
  const [calendarType, setCalendarType] = useState(0);

  return (
    <StyledWrap>
      <TabList list={["日", "週", "月"]} value={dateType} onClick={setDateType} />
      <StyledCheckBox>
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
      </StyledCheckBox>
      <StyledTabPanel>
        <TabList
          list={["all", "自分の"]}
          value={calendarType}
          onClick={setCalendarType}
          type="panel"
        />
      </StyledTabPanel>
      <StyledTabView>
        <TabView value={calendarType} onChange={setCalendarType}>
          <TabItem>
            <StyledContent>
              <Calendar />
            </StyledContent>
          </TabItem>
          <TabItem>
            <StyledContent>
              <Calendar />
            </StyledContent>
          </TabItem>
        </TabView>
      </StyledTabView>
    </StyledWrap>
  );
};
