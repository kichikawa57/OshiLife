import React, { FC } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";
import { Modal } from "react-native";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { RoutingPropsOfSchedule } from "../../../router/app/Schedule/types";
import { Input } from "../../../components/Input";
import { Accordion } from "../../../components/Accordion";
import { Textarea } from "../../../components/Textarea";
import { Header } from "../../../components/Header/Normal";
import { Icon } from "../../../components/Icon";
import { SelectOshiListContent } from "../../../components/BottomSheetContents/SelectOshiListContent";

import { useScheduleDetail } from "./hooks";
import { StyledWrap, StyledContent, StyledDatePickerError, StyledInner } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"schedule">;
  scheduleRoute: RoutingPropsOfSchedule<"edit">;
};

export const Edit: FC<Props> = ({ scheduleRoute }) => {
  const params = scheduleRoute.route.params;

  const { isModal, control, clearErrors, setIsModal, onPressComplete } = useScheduleDetail(
    scheduleRoute,
    params,
  );

  return (
    <>
      <Modal animationType="slide" visible={isModal} presentationStyle="fullScreen">
        <Controller
          control={control}
          name={"oshiName"}
          render={({ field: { onChange } }) => (
            <SelectOshiListContent
              onPressCancel={() => {
                setIsModal(false);
              }}
              onPressComplete={(_, name) => {
                onChange(name);
                setIsModal(false);
                clearErrors("oshiName");
              }}
            />
          )}
        />
      </Modal>
      <Header
        title={params?.title ? `${params?.title}の編集` : "スケジュール新規作成"}
        onPressLeft={() => {
          scheduleRoute.navigation.goBack();
        }}
        right={
          <Icon
            name="check"
            onPress={() => {
              onPressComplete();
            }}
          />
        }
      />
      <StyledWrap>
        <StyledInner>
          <StyledContent>
            <Controller
              control={control}
              name={"title"}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Input
                  title="タイトル"
                  value={value}
                  onChangeText={(value) => {
                    onChange(value);
                    clearErrors("title");
                  }}
                  errorMessage={error && error.message}
                />
              )}
            />
          </StyledContent>
          <StyledContent>
            <Controller
              control={control}
              name={"oshiName"}
              render={({ field: { value }, fieldState: { error } }) => (
                <Input
                  title="推し選択"
                  value={value}
                  onPress={() => setIsModal(true)}
                  editable={false}
                  errorMessage={error && error.message}
                />
              )}
            />
          </StyledContent>
          <StyledContent>
            <Controller
              control={control}
              name={"startDate"}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Accordion
                    title={`開始日付: ${
                      value !== "" ? dayjs(value).format("YYYY年MM月DD日 HH時 mm分") : "未選択"
                    }`}
                  >
                    <DatePicker
                      date={dayjs(value !== "" ? value : undefined).toDate()}
                      onDateChange={(date) => {
                        onChange(dayjs(date).format("YYYY-MM-DD HH:mm:ss"));
                        clearErrors(["startDate", "endDate"]);
                      }}
                      mode="datetime"
                      locale="ja"
                    />
                  </Accordion>
                  {error && <StyledDatePickerError>{error.message}</StyledDatePickerError>}
                </>
              )}
            />
          </StyledContent>
          <StyledContent>
            <Controller
              control={control}
              name={"endDate"}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <Accordion
                    title={`終了日付: ${
                      value !== "" ? dayjs(value).format("YYYY年MM月DD日 HH時 mm分") : "未選択"
                    }`}
                  >
                    <DatePicker
                      date={dayjs(value !== "" ? value : undefined).toDate()}
                      onDateChange={(date) => {
                        onChange(dayjs(date).format("YYYY-MM-DD HH:mm:ss"));
                        clearErrors(["startDate", "endDate"]);
                      }}
                      mode="datetime"
                      locale="ja"
                    />
                  </Accordion>
                  {error && <StyledDatePickerError>{error.message}</StyledDatePickerError>}
                </>
              )}
            />
          </StyledContent>
          <StyledContent isHideMarginBottom>
            <Controller
              control={control}
              name={"memo"}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Textarea
                  title="メモ"
                  value={value}
                  onChangeText={(value) => {
                    onChange(value);
                    clearErrors("memo");
                  }}
                  errorMessage={error && error.message}
                />
              )}
            />
          </StyledContent>
        </StyledInner>
      </StyledWrap>
    </>
  );
};
