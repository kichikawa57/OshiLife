import { z } from "zod";

import { checkFormData } from "../../shared/validate";

export const formData = z.object({
  title: z.string().nonempty("予定のタイトルを入れてください"),
  date: z.string().datetime("日付を選択してください"),
  oshiName: z.string().nonempty("推しを選択してください"),
  memo: z.string().optional(),
});

export type FormData = z.infer<typeof formData>;

export const formValidation = (data: FormData) => checkFormData(formData, data);
