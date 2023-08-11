import React, { FC } from "react";
import { Control, Controller, UseFormClearErrors } from "react-hook-form";

import { Input } from "../../Input";
import { FormData } from "../../../pages/Profile/validate";
import { ContentBase } from "../ContentBase";

import { StyledContent } from "./style";

type Props = {
  control: Control<FormData>;
  clearErrors: UseFormClearErrors<FormData>;
  onPressCancel: () => void;
  onPressComplete: () => void;
};

export const EditProfileContent: FC<Props> = ({
  control,
  clearErrors,
  onPressCancel,
  onPressComplete,
}) => {
  return (
    <ContentBase onPressCancel={onPressCancel} onPressComplete={onPressComplete}>
      <StyledContent isHiddenBottom>
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
    </ContentBase>
  );
};
