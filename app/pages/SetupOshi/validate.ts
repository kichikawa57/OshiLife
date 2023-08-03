import { z } from "zod";

import { checkFormData } from "../../shared/validate";

export const formData = z.object({
  name: z.string().nonempty("推しの名前を記入してください"),
  color: z.string().nonempty("推しの色を選択してください"),
});

export type FormData = z.infer<typeof formData>;

export const formValidation = (data: FormData) => checkFormData(formData, data);
