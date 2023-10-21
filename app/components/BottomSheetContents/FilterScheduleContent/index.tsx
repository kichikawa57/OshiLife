import React, { FC } from "react";

import { ContentBase } from "../ContentBase";
import { CheckBoxGroup } from "../../CheckBox/Group";
import { CheckBoxItem } from "../../CheckBox/Item";
import { TabList } from "../../Tab/List";
import { OshiId } from "../../../model/oshis";
import { useQueryClient } from "../../../query";

import { StyledContent, StyledContentWrap } from "./style";

type Props = {
  dateType: number;
  calendarType: number;
  displayedOshis: OshiId[] | null;
  updateDisplayedOshis: (oshiId: OshiId) => void;
  setDateType: (index: number) => void;
  setCalendarType: (index: number) => void;
  onPressCancel: () => void;
};

export const FilterScheduleContent: FC<Props> = ({
  displayedOshis,
  onPressCancel,
  updateDisplayedOshis,
}) => {
  const { getQueryData } = useQueryClient();
  const oshis = getQueryData("getOshis");

  return (
    <ContentBase
      onPressCancel={onPressCancel}
      headerPosition="right"
      isAbleToScroll={false}
      isFullHeight={false}
    >
      <StyledContentWrap>
        <StyledContent>
          <CheckBoxGroup>
            {oshis &&
              oshis.map((oshi) => {
                return (
                  <CheckBoxItem
                    key={`${oshi.id}`}
                    imageUrl="testr"
                    isSelected={
                      displayedOshis !== null
                        ? displayedOshis.some((displayedOshi) => displayedOshi === oshi.id)
                        : true
                    }
                    name={oshi.artists?.name || ""}
                    onPress={() => {
                      updateDisplayedOshis(oshi.id);
                    }}
                    isMarginRight
                  />
                );
              })}
          </CheckBoxGroup>
        </StyledContent>
        {/* <StyledContent>
          <TabList list={["日", "週", "月"]} value={dateType} type="panel" onClick={setDateType} />
        </StyledContent>
        <StyledContent isHiddenBottom>
          <TabList
            list={["自分の", "それ以外"]}
            value={calendarType}
            onClick={setCalendarType}
            type="panel"
          />
        </StyledContent> */}
      </StyledContentWrap>
    </ContentBase>
  );
};
