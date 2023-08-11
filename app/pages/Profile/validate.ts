import { z } from "zod";

import { checkFormData } from "../../shared/validate";

export const formData = z.object({
  email: z.string().email("メールアドレスを正しく記載してください"),
});

export type FormData = z.infer<typeof formData>;

export const formValidation = (data: FormData) => checkFormData(formData, data);
