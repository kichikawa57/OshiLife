import { z } from "zod";

export const validateEmailAndPassword = {
  email: z.string().email("メールアドレスを正しく記載してください"),
  password: z.string().min(8, "最低8文字です").max(16, "最大16文字です"),
};

export const validateEditOshi = {
  image: z.string().optional(),
  name: z.string().nonempty("推しの名前を記入してください"),
  color: z.string().nonempty("推しの色を選択してください"),
  memo: z.string().nonempty("推しの色を選択してください"),
};

export const validateEditSchedule = {
  title: z.string().nonempty("予定のタイトルを入れてください"),
  date: z.string(),
  oshiName: z.string().nonempty("推しを選択してください"),
  memo: z.string().optional(),
};

export const validateEditProfile = {
  email: z.string().email("メールアドレスを正しく記載してください"),
};

type ErrorKeys<T> = keyof T;

export const checkFormData = <T>(formData: z.ZodObject<z.ZodRawShape>, data: T) => {
  const result = formData.safeParse(data);

  if (result.success) return null;

  const initialErrorData: Partial<{ [key in ErrorKeys<T>]: string }> = {};

  const errorData = result.error.issues.reduce<{ [key in ErrorKeys<T>]: string }>(
    (errorData, issue) => {
      const key = issue.path[0] as ErrorKeys<T>;
      errorData[key] = issue.message;
      return errorData;
    },
    initialErrorData as { [key in ErrorKeys<T>]: string },
  );

  return errorData;
};
