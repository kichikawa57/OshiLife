import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { RoutingPropsOfRoot } from "../../router/types";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { StyledButton, StyledButtonWrap, StyledForm, StyledInput, StyledWrap } from "./style";
import { useSetupUser } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"setupUser">;
};

export const SetupUser: FC<Props> = ({ rootRoute }) => {
  const { control, clearErrors, onPress } = useSetupUser(rootRoute);

  return (
    <StyledWrap>
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
        <StyledButton>
          <Button title="次へ" onPress={onPress} />
        </StyledButton>
      </StyledButtonWrap>
    </StyledWrap>
  );
};
