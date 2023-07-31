import { z } from "zod";

export const formData = z.object({
  email: z.string().email("メールアドレスを正しく記載してください"),
  password: z.string().min(8, "最低8文字です").max(16, "最大16文字です"),
});

export type FormData = z.infer<typeof formData>;

type ErrorKeys = keyof FormData;

export const formValidation = (data: FormData) => {
  const result = formData.safeParse(data);

  if (result.success) return null;

  const errorData = result.error.issues.reduce<{
    [key in ErrorKeys]: string;
  }>(
    (errorData, issue) => {
      const key = issue.path[0] as ErrorKeys;
      errorData[key] = issue.message;
      return errorData;
    },
    {
      email: "",
      password: "",
    },
  );

  return errorData;
};
