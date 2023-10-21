import dayjs from "dayjs";
import { z } from "zod";

export const validateEditProfile = {
  name: z.string().nonempty("ユーザー名を記入してください").max(30, "ユーザー名は最大30文字です"),
  email: z.string().email("メールアドレスを正しく記載してください"),
  sex: z
    .union([z.literal("men"), z.literal("women"), z.literal("")])
    .refine((value) => value !== "", "性別を選んでください"),
};

export const validateSetupUserData = {
  ...validateEditProfile,
  password: z.string().min(8, "パスワードは最低8文字です").max(16, "パスワードは最大16文字です"),
};

export const validateEmailAndPassword = {
  email: validateSetupUserData.email,
  password: validateSetupUserData.password,
};

export const validateEditOshi = {
  artistId: z.string().nonempty("推しを選択してください"),
  name: z.string().nonempty("推しを選択してください"),
  image: z.string().optional(),
  color: z.string().nonempty("推しの色を選択してください"),
  memo: z.string().optional(),
};

export const validateEditSchedule = {
  title: z.string().nonempty("予定のタイトルを入れてください"),
  startDate: z.string().nonempty("開始日を設定してください"),
  endDate: z.string().nonempty("終了日を設定してください"),
  oshiId: z.string().nonempty("推しを選択してください"),
  artistId: z.string().nonempty("推しを選択してください"),
  oshiName: z.string().nonempty("推しを選択してください"),
  isPublic: z.boolean(),
  memo: z.string().optional(),
};

export const validateDateRange = (data: { startDate: string; endDate: string }) => {
  if (data.startDate && data.endDate) {
    const isValid =
      dayjs(data.startDate).isBefore(data.endDate) || dayjs(data.startDate).isSame(data.endDate);

    return !isValid ? "開始日は終了日より後の日付にできません" : "";
  }
  return "";
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
