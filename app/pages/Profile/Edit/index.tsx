import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { RoutingPropsOfRoot } from "../../../router/types";
import { RoutingPropsOfApp } from "../../../router/app/types";
import { Input } from "../../../components/Input";
import { Header } from "../../../components/Header/Normal";
import { Icon } from "../../../components/Icon";
import { RoutingPropsOfProfile } from "../../../router/app/Profile/types";
import { CircleCheckBox } from "../../../components/CheckBox/Circle";

import { useProfileEdit } from "./hooks";
import { StyledWrap, StyledContent, StyledError, StyledSexWrap, CircleCheckBoxWrap } from "./style";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"appProfile">;
  profileRoute: RoutingPropsOfProfile<"appProfileEdit">;
};

export const Edit: FC<Props> = ({ profileRoute }) => {
  const params = profileRoute.route.params;

  const { isLoading, control, clearErrors, onPressComplete } = useProfileEdit(profileRoute, params);

  return (
    <>
      <Header
        title={"プロフィール編集"}
        isDisabled={isLoading}
        onPressLeft={() => {
          profileRoute.navigation.goBack();
        }}
        right={
          <Icon
            name="check"
            onPress={() => onPressComplete()}
            disabled={isLoading}
            touchableWidth={300}
            touchableHeight={100}
          />
        }
      />
      <StyledWrap>
        <StyledContent>
          <Controller
            control={control}
            name={"name"}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                title="ユーザー名"
                value={value}
                onChangeText={(value) => {
                  onChange(value);
                  clearErrors("name");
                }}
                errorMessage={error && error.message}
              />
            )}
          />
        </StyledContent>
        <StyledContent>
          <Controller
            control={control}
            name={"email"}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                title="メールアドレス"
                value={value}
                onChangeText={(value) => {
                  onChange(value);
                  clearErrors("email");
                }}
                errorMessage={error && error.message}
              />
            )}
          />
        </StyledContent>
        <StyledContent>
          <Controller
            control={control}
            name={"sex"}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <StyledSexWrap>
                  <CircleCheckBoxWrap>
                    <CircleCheckBox
                      title="男性"
                      checked={value === "men"}
                      onPress={() => {
                        onChange("men");
                        clearErrors("sex");
                      }}
                    />
                  </CircleCheckBoxWrap>
                  <CircleCheckBox
                    title="女性"
                    checked={value === "women"}
                    onPress={() => {
                      onChange("women");
                      clearErrors("sex");
                    }}
                  />
                </StyledSexWrap>
                {error && <StyledError>{error.message}</StyledError>}
              </>
            )}
          />
        </StyledContent>
      </StyledWrap>
    </>
  );
};
