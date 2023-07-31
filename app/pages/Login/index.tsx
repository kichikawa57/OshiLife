import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { RoutingPropsOfRoot } from "../../router/types";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import {
  StyledWrap,
  StyledTitle,
  StyledForm,
  StyledInput,
  StyledButtonWrap,
  StyledButton,
} from "./style";
import { useLogin } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"login">;
};

export const Login: FC<Props> = ({ rootRoute }) => {
  const { control, clearErrors, onPress } = useLogin();

  return (
    <StyledWrap>
      <StyledTitle>OshiLife</StyledTitle>
      <StyledForm>
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
      <StyledButtonWrap>
        <StyledButton isMarginBottom={true}>
          <Button title="ログイン" onPress={onPress} />
        </StyledButton>
        <StyledButton isMarginBottom={false}>
          <Button title="新規登録" onPress={() => rootRoute.navigation.navigate("setupUser")} />
        </StyledButton>
      </StyledButtonWrap>
    </StyledWrap>
  );
};
