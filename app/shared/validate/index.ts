import dayjs from "dayjs";
import { z } from "zod";

export const validateEmailAndPassword = {
  email: z.string().email("メールアドレスを正しく記載してください"),
  password: z.string().min(8, "最低8文字です").max(16, "最大16文字です"),
};

export const validateEditOshi = {
  image: z.string().optional(),
  name: z.string().nonempty("推しの名前を記入してください"),
  color: z.string().nonempty("推しの色を選択してください"),
  memo: z.string().optional(),
};

export const validateEditSchedule = {
  title: z.string().nonempty("予定のタイトルを入れてください"),
  startDate: z.string().nonempty("開始日を設定してください"),
  endDate: z.string().nonempty("終了日を設定してください"),
  oshiName: z.string().nonempty("推しを選択してください"),
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
