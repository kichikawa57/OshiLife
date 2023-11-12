import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { RoutingPropsOfRoot } from "../../router/types";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { CircleCheckBox } from "../../components/CheckBox/Circle";
import { KeyboardWrapper } from "../../components/KeyboardWrapper";
import { Header } from "../../components/Header/Normal";

import {
  StyledButton,
  StyledButtonWrap,
  StyledForm,
  StyledInput,
  StyledSexWrap,
  StyledWrap,
  StyledError,
} from "./style";
import { useSetupUser } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"setupUser">;
};

export const SetupUser: FC<Props> = ({ rootRoute }) => {
  const { control, clearErrors, onPress } = useSetupUser(rootRoute);

  return (
    <>
      <Header title={"ユーザー情報"} onPressLeft={() => rootRoute.navigation.goBack()} />
      <KeyboardWrapper>
        <StyledWrap>
          <StyledForm>
            <StyledInput isMarginBottom={true}>
              <Controller
                control={control}
                name={"name"}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Input
                    title="ユーザー名"
                    value={value}
                    onChangeText={(value) => {
                      console.log("tetst");
                      onChange(value);
                      clearErrors("name");
                    }}
                    errorMessage={error && error.message}
                  />
                )}
              />
            </StyledInput>
            <StyledInput isMarginBottom={true}>
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
            </StyledInput>
            <StyledInput isMarginBottom={true}>
              <Controller
                control={control}
                name={"sex"}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <>
                    <StyledSexWrap>
                      <CircleCheckBox
                        title="男性"
                        checked={value === "men"}
                        onPress={() => {
                          onChange("men");
                          clearErrors("sex");
                        }}
                      />
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
            </StyledInput>
            <StyledInput isMarginBottom={false}>
              <Controller
                control={control}
                name={"password"}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Input
                    title="パスワード"
                    value={value}
                    secureTextEntry={true}
                    onChangeText={(value) => {
                      onChange(value);
                      clearErrors("password");
                    }}
                    errorMessage={error && error.message}
                  />
                )}
              />
            </StyledInput>
          </StyledForm>
        </StyledWrap>
      </KeyboardWrapper>
      <StyledButtonWrap>
        <StyledButton>
          <Button title="次へ" onPress={() => onPress()} />
        </StyledButton>
      </StyledButtonWrap>
    </>
  );
};
