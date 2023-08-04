import React, { FC } from "react";
import { Controller } from "react-hook-form";

import { Input } from "../../components/Input";
import { RoutingPropsOfRoot } from "../../router/types";
import { CircleList } from "../../components/CircleForColor/CircleList";
import { Button } from "../../components/Button";

import { StyledButton, StyledButtonWrap, StyledForm, StyledInput, StyledWrap } from "./style";
import { useSetupOshi } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"setupOshi">;
};

export const SetupOshi: FC<Props> = ({ rootRoute }) => {
  const { control, clearErrors, onPress } = useSetupOshi(rootRoute);

  return (
    <StyledWrap>
      <StyledForm>
        <StyledInput isMarginBottom={true}>
          <Controller
            control={control}
            name={"name"}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                title="メールアドレス"
                value={value}
                onChangeText={(value) => {
                  onChange(value);
                  clearErrors("name");
                }}
                errorMessage={error && error.message}
              />
            )}
          />
        </StyledInput>
        <StyledInput isMarginBottom={false}>
          <Controller
            control={control}
            name={"color"}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CircleList
                title="推しの色を選択してください"
                selectColor={value}
                onClick={(color) => {
                  onChange(color !== value ? color : "");
                  clearErrors("color");
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
